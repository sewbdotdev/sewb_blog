import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
import Image from "next/image";
import TestImage1 from "/public/img/test-1.jpg";

const RelatedContent: FunctionComponent = () => {
  return (
    <div className={styles.relatedContentContainer}>
      <div className={styles.contentCover}>
        <Image
          src={TestImage1}
          alt="the featured image of the blog post."
          layout="fixed"
          width={60}
          height={40}
        />
      </div>
      <p className={styles.relatedContentTitle}>
        If You Don’t Like Twitter, It’s Because You Don’t Use These Bots
      </p>
    </div>
  );
};

export default RelatedContent;
