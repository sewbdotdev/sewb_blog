import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
import Image from "next/image";
import Tag from "@/components/Tag";
const ArticlePreview: FunctionComponent = (props) => {
  return (
    <div className={styles.articlePreviewContainer}>
      <div className={styles.articlePreviewChildOneContainer}>
        <div className={styles.articlePreviewChildOneContainerInnerContainer}>
          <div className={styles.articlePreviewNameImageContainer}>
            <Image
              src="/img/test-1.jpg"
              layout="responsive"
              width={10}
              height={10}
              alt="Picture of the author"
              sizes="50vw"
              priority={true}
            />
          </div>
          <h6 className={styles.articlePreviewName}>
            Temiloluwa Ojo et al <span className="font-normal">in</span>{" "}
            Software Architecture
          </h6>
        </div>
        <h2 className={styles.articlePreviewTitle}>
          Why Do We Sleep? Science May Have Finally Figured It Out
        </h2>
        <div className={styles.articlePreviewMeta}>
          <p>Date here</p>
          <p>
            · 5 min read
            <span> ·</span>
          </p>
          <Tag />
        </div>
      </div>
      <div className={styles.articlePreviewChildTwoContainer}>
        <Image
          src="/img/test-2.jpeg"
          layout="fill"
          objectFit="cover"
          priority={true}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default ArticlePreview;
