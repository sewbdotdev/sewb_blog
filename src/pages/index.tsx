import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Category from "@/components/Category";
import ArticlePreview from "@/components/Cards/ArticlePreview";
const Home: NextPage = (props) => {
  return (
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
  );
};
  
export default Home;
