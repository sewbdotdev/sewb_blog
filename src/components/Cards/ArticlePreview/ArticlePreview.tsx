import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
import Image from "next/image";
import Tag from "@/components/Tag";
import { CategoryOrTag } from "@customTypes/categoryandtag";
import dateFormatter from "utils/dateFormatter";
import Link from "next/link";

type ArticlePreviewProps = {
  className?: string;
  authorName?: string;
  title: string;
  tag: CategoryOrTag;
  category: CategoryOrTag;
  description: string;
  readTime: number;
  publishedAt: string;
  hasMultiAuthor?: boolean;
  slug: string;
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
            <a className="font-normal">in</a>{" "}
            <Link href={`/category/${props.category.attributes.slug}`}>
              <a className="hover:underline">
                {props.category.attributes.title}
              </a>
            </Link>
          </h6>
        </div>
        <h2 className={styles.articlePreviewTitle}>
          <Link href={`/posts/${props.slug}`}>
            <a>{props.title}</a>
          </Link>
        </h2>
        <div className={styles.articlePreviewMeta}>
          <p className="text-xs text-ellipsis">
            {dateFormatter(props.publishedAt)}
          </p>
          <p className="text-xs pr-3">
            · {props.readTime || 5} min
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
