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
import { getPostsByCategory, getPostsByTag } from "hooks/usePost";
import { useState } from "react";
interface Props {
  data: CategoryOrTag | undefined;
}

const CategoryOrTagPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const { ptype, slug } = router.query;
  const [page, setPageNo] = useState(1);
  const { data: postData, status } =
    ptype === "tag"
      ? useQuery(["posts", { tagSlug: String(slug), page }], () =>
          getPostsByTag(String(slug))
        )
      : useQuery(["posts", { categorySlug: String(slug), page }], () =>
          getPostsByCategory(String(slug))
        );

  if (status === "loading") {
    return (
      <Content>
        <p>Loading...</p>
      </Content>
    );
  }
  if (status === "error") {
    return (
      <Content>
        <p>An Error has occured...</p>
      </Content>
    );
  }

  return (
    <Content classNames="overflow-y-hidden">
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
            {postData?.data.map((post) => (
              <ArticlePreview
                className="border-b border-gray-600 pb-4"
                publishedAt={post.attributes.publishedAt}
                authorName={post.attributes.authors.data[0].attributes.username}
                category={post.attributes.category.data}
                tag={post.attributes.tags.data[0]}
                description={post.attributes.description}
                readTime={post.attributes.readTime}
                key={post.id}
                title={post.attributes.title}
                hasMultiAuthor={post.attributes.authors.data.length > 1}
              />
            ))}
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
        ["posts", { tagSlug: String(params.slug), page: 1 }],
        () => getPostsByTag(String(params.slug))
      );
    } else {
      await queryClient.prefetchQuery(
        ["posts", { categorySlug: String(params.slug), page: 1 }],
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
