import Content from "@/components/Content";
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from "next";
import styles from "../../styles/CategoryOrTag.module.css";
import contentStyles from "../../styles/Content.module.css";
import Author from "@/components/Author";
import { CollectionIcon, TagIcon } from "@heroicons/react/solid";
import Related from "@/components/Related";
import { useRouter } from "next/router";
import ArticlePreview from "@/components/Cards/ArticlePreview";
import Tag from "@/components/Tag";
import CategoryCard from "@/components/Cards/CategoryCard";
import Category from "@/components/Category";
import {
  getCategories,
  getOneCategory,
  getOneTag,
  getTags,
} from "hooks/useCategoryAndTag";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CategoryOrTag } from "@customTypes/categoryandtag";
import {
  getPostsByCategory,
  getPostsByTag,
  useInfinitePostByPtype,
} from "hooks/usePost";
import { Fragment, useEffect, useState } from "react";
import {
  CategoryEntity,
  TagEntity,
  UsersPermissionsUser,
} from "@customTypes/generated/graphql";
import DataWrapper from "@/components/DataWrapper";
import { useInView } from "react-intersection-observer";
import { NextSeo } from "next-seo";
import Helpers from "utils/helpers";
interface Props {
  data: CategoryOrTag | undefined;
}

const CategoryOrTagPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const { ptype, slug } = router.query;
  // const [page, setPageNo] = useState(1);
  const postData = useInfinitePostByPtype(String(slug), String(ptype));
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && postData.hasNextPage) {
      postData.fetchNextPage();
    }
  }, [inView, postData.hasNextPage]);

  const seo = {
    title: `${Helpers.capitalize(
      Helpers.replace(String(slug))
    )} ${Helpers.capitalize(String(ptype))}`,
    description: `Post ${ptype} on SEWB Blog.`,
  };

  return (
    <Content classNames="overflow-y-hidden">
      <NextSeo {...seo} />
      <div className={contentStyles.container}>
        <section className={contentStyles.contentContainer}>
          <div className={styles.titleContainer}>
            {ptype === "category" ? (
              <CollectionIcon className="h-5 w-5 self-center" />
            ) : (
              <TagIcon className="h-5 w-5 self-center" />
            )}
            <h2 className={contentStyles.contentTitle}>{slug}</h2>
          </div>

          <section className={styles.contentPreviewContainer}>
            <DataWrapper status={postData.status}>
              {postData?.data?.pages?.map((page) => (
                <Fragment key={page.meta.pagination.page}>
                  {page.data.map((post) => {
                    const isMultiAuthored = post.attributes?.authors?.data
                      ? post.attributes.authors.data.length > 1
                      : false;
                    const previewProps = {
                      isMultiAuthored,
                      author: post.attributes?.authors?.data[0]
                        .attributes as UsersPermissionsUser,
                      title: post.attributes?.title ?? "",
                      tag: post.attributes?.tags?.data[0] as TagEntity,
                      category: post.attributes?.category
                        ?.data as CategoryEntity,
                      description: post.attributes?.description ?? "",
                      readTime: Number(post.attributes?.readTime),
                      publishedAt: post.attributes?.publishedAt,
                      slug: post.attributes?.slug ?? "",
                      featuredURL:
                        post.attributes?.featuredImage.data?.attributes?.url,
                    };

                    return <ArticlePreview {...previewProps} key={post.id} />;
                  })}
                </Fragment>
              ))}
              <div className="flex justify-center">
                <button
                  ref={ref}
                  onClick={() => {
                    postData.fetchNextPage();
                  }}
                  disabled={
                    !postData.hasNextPage || postData.isFetchingNextPage
                  }
                >
                  {postData.hasNextPage && postData.isFetchingNextPage
                    ? "Fetching..."
                    : ""}
                </button>
              </div>
              <div>
                {postData.isFetching && !postData.isFetchingNextPage
                  ? "Background Updating..."
                  : null}
              </div>
            </DataWrapper>
          </section>
        </section>
        <aside className={`${styles.asideContainer}`}>
          {/* <Category
            isTag={ptype === "tag"}
            heading={`Discover More ${
              ptype === "category" ? "Categories" : "Tags"
            }`}
          /> */}
        </aside>
      </div>
    </Content>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const responseOne = await getCategories();
  const responseTwo = await getTags();
  const categoryPaths = responseOne.data.map((cat) => ({
    params: {
      ptype: "category",
      slug: cat.attributes.slug,
    },
  }));
  const tagPaths = responseTwo.data.map((tag) => ({
    params: {
      ptype: "tag",
      slug: tag.attributes.slug,
    },
  }));
  return {
    paths: [...categoryPaths, ...tagPaths],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const { params } = ctx;
  if (params && params.ptype) {
    if (params.ptype === "tag") {
      await queryClient.prefetchQuery(
        ["posts", { ptype: "tag", slug: String(params.slug) }],
        () => getPostsByTag(String(params.slug))
      );
    } else {
      await queryClient.prefetchQuery(
        ["posts", { ptype: "category", slug: String(params.slug) }],
        () => getPostsByCategory(String(params.slug))
      );
    }
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params,
    },
    revalidate: 1,
  };
};

export default CategoryOrTagPage;
