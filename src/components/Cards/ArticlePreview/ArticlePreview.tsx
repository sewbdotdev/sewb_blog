import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
import Image from "next/image";
import Tag from "@/components/Tag";
import { CategoryOrTag } from "@customTypes/categoryandtag";

type ArticlePreviewProps = {
  className?: string;
  authorName: string;
  title: string;
  tag: CategoryOrTag;
  category: CategoryOrTag;
  description: string;
  readTime: number;
  publishedAt: string;
  hasMultiAuthor?: boolean;
};
const ArticlePreview: FunctionComponent<ArticlePreviewProps> = (props) => {
  return (
    <div className={`${styles.articlePreviewContainer} ${props.className}`}>
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
            {props.authorName} {props.hasMultiAuthor ? "et al" : ""}{" "}
            <span className="font-normal">in</span> {props.category.attributes.title}
          </h6>
        </div>
        <h2 className={styles.articlePreviewTitle}>{props.title}</h2>
        <div className={styles.articlePreviewMeta}>
          <p>Date here</p>
          <p>
            · {props.readTime || 5} min read
            <span> ·</span>
          </p>
          <Tag
            title={props.tag.attributes.title}
            className="truncate"
            containerClassName="w-24"
            slug={props.tag.attributes.slug}
          />
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
