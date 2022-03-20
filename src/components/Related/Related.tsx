import { Post, PostEntity } from "@customTypes/generated/graphql";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import RelatedContent from "../Cards/RelatedContent";
import styles from "./Related.module.css";
import TestImage1 from "/public/img/test-1.jpg";

type RelatedProps = {
  posts: PostEntity[];
};
const Related: FunctionComponent<RelatedProps> = (props) => {
  const { posts } = props;
  console.log(posts);
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Related</h3>
      {posts.map((post) => (
        <RelatedContent key={post.id} post={post.attributes as Post} />
      ))}
    </section>
  );
};

export default Related;
