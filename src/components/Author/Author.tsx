import React, { FunctionComponent } from "react";
import styles from "./Author.module.css";
import TestImage2 from "/public/img/test-2.jpeg";
import Image from "next/image";

const Author: FunctionComponent = () => {
  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={TestImage2}
          alt="the featured image of the blog post. "
          width={80}
          height={100}
        />
        <h3 className={styles.name}>Temiloluwa Ojo.</h3>
        <p className={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <div className={styles.linkContainer}>
          <a className={styles.linkText}>Twitter here</a>
          <a className={styles.linkText}>Linkedin here</a>
        </div>
      </div>
    </article>
  );
};
export default Author;
