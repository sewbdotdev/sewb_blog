import type { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Category from "@/components/Category";
import ArticlePreview from "@/components/Cards/ArticlePreview";
import Content from "@/components/Content";
import Feature from "@/components/Feature";
import { getCategories } from "hooks/useCategoryAndTag";
const Home: NextPage = (props) => {
  const { data: categories, status } = useQuery(["categories", 1], () =>
    getCategories()
  );
  console.log(categories);

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
          {categoryData && <Category data={categoryData} />}
        </aside>
        <section className={styles.contentSection}>
          {/* <ArticlePreview />
          <ArticlePreview />
          <ArticlePreview />
          <ArticlePreview /> */}
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
