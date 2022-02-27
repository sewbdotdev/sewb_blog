import type { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Category from "@/components/Category";
import ArticlePreview from "@/components/Cards/ArticlePreview";
import Content from "@/components/Content";
import Feature from "@/components/Feature";
import { getCategories } from "hooks/useCategoryAndTag";
import { useInfinitePosts } from "hooks/usePost";
import React from "react";
import DataWrapper from "@/components/DataWrapper";
const Home: NextPage = (props) => {
  const { data: categories, status } = useQuery(["categories", 1], () =>
    getCategories()
  );
  const postsData = useInfinitePosts();

  const categoryData = categories?.data.map((cat) => ({
    id: cat.id,
    attributes: {
      ...cat.attributes,
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
              <React.Fragment key={page.meta.pagination.page}>
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
              </React.Fragment>
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
