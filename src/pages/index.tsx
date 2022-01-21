import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Category from "@/components/Category";
import ArticlePreview from "@/components/Cards/ArticlePreview";
import Content from "@/components/Content";
const Home: NextPage = (props) => {
  return (
    <Content>
      <section className={styles.container}>
        <aside className={styles.asideSection}>
          <Category />
        </aside>
        <section className={styles.contentSection}>
          <ArticlePreview />
          <ArticlePreview />
          <ArticlePreview />
          <ArticlePreview />
        </section>
      </section>
    </Content>
  );
};

export default Home;
