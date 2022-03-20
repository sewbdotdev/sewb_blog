import type { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState, Fragment } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Category from "@/components/Category";
import ArticlePreview from "@/components/Cards/ArticlePreview";
import Content from "@/components/Content";
import Feature from "@/components/Feature";
import { getCategories } from "hooks/useCategoryAndTag";
import { useInfinitePosts } from "hooks/usePost";
import DataWrapper from "@/components/DataWrapper";
import {
  useGetAllCategoriesQuery,
  useGetPostBySlugQuery,
} from "@customTypes/generated/graphql";
import { getClient } from "utils/client";
import { useInView } from 'react-intersection-observer';
const Home: NextPage = (props) => {
  const postsData = useInfinitePosts();
  const { data, status } = useGetAllCategoriesQuery(getClient(), {
    page: 1,
    pageSize: 10,
  });

  const { ref, inView } = useInView();

  const categoryData = data?.categories?.data.map((cat) => ({
    id: String(cat.id),
    attributes: {
      title: String(cat.attributes?.title),
      slug: String(cat.attributes?.slug),
    },
  }));

  return (
    <Content>
      <Feature />
      <section className={styles.container}>
        <aside className={styles.asideSection}>
          <DataWrapper status={status}>
            {categoryData && <Category data={categoryData} />}
          </DataWrapper>
        </aside>
        <section className={styles.contentSection}>
          <DataWrapper status={postsData.status}>
            {postsData.data?.pages.map((page) => (
              <Fragment key={page.meta.pagination.page}>
                {page.data.map((project) => {
                  const previewProps = {
                    authorName:
                      project.attributes.authors.data[0].attributes.username,
                    title: project.attributes.title,
                    tag: project.attributes.tags.data[0],
                    category: project.attributes.category.data,
                    description: project.attributes.description,
                    readTime: project.attributes.readTime,
                    publishedAt: project.attributes.publishedAt,
                    hasMultiAuthor: project.attributes.authors.data.length > 1,
                    slug: project.attributes.slug,
                  };

                  return <ArticlePreview {...previewProps} key={project.id} />;
                })}
              </Fragment>
            ))}
          </DataWrapper>
        </section>
      </section>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["categories", 1], () => getCategories());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
