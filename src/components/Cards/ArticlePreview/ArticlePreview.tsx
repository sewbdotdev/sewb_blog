import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
import Image, { ImageLoaderProps } from "next/image";
import Tag from "@/components/Tag";
import dateFormatter from "utils/dateFormatter";
import Link from "next/link";
import {
  CategoryEntity,
  TagEntity,
  UsersPermissionsUser,
} from "@customTypes/generated/graphql";
import DefaultUserImg from "/public/img/default-user.png";
import DefaultPostImg from "/public/img/dark-feature.png";
import Helpers from "utils/helpers";

type ArticlePreviewProps = {
  className?: string;
  title: string;
  tag: TagEntity;
  category: CategoryEntity;
  description: string;
  readTime: number | undefined;
  publishedAt: string;
  isMultiAuthored?: boolean;
  slug: string;
  author: UsersPermissionsUser;
  featuredURL: string | undefined;
};

const sanityIoImageLoader = (props: ImageLoaderProps) => {
  const { src, quality, width } = props;
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
};

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = (props) => {
  const isImagePresent = Boolean(props.author?.avatar?.data?.attributes?.url);
  return (
    <div className={`${styles.articlePreviewContainer} ${props.className}`}>
      <div className={styles.articlePreviewChildOneContainer}>
        <div className={styles.articlePreviewChildOneContainerInnerContainer}>
          <div className={styles.articlePreviewNameImageContainer}>
            {isImagePresent ? (
              <Image
                src={Helpers.getImageURL(
                  String(props.author?.avatar?.data?.attributes?.url)
                )}
                layout="responsive"
                width={10}
                height={10}
                alt="Picture of the author"
                sizes="50vw"
              />
            ) : (
              <Image
                src={DefaultUserImg}
                layout="responsive"
                alt="Picture of the author"
                sizes="50vw"
              />
            )}
          </div>
          <h6 className={styles.articlePreviewName}>
            {props.author?.username} {props.isMultiAuthored ? "et al" : ""}{" "}
            <a className="font-normal">in</a>{" "}
            <Link href={`/category/${String(props.category.attributes?.slug)}`}>
              <a className="hover:underline">
                {props.category.attributes?.title}
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
            title={props.tag.attributes?.title ?? ""}
            className="truncate"
            containerClassName="w-24"
            slug={props.tag.attributes?.slug ?? ""}
          />
        </div>
      </div>
      <div className={styles.articlePreviewChildTwoContainer}>
        {Boolean(props.featuredURL) ? (
          <Image
            src={Helpers.getImageURL(String(props.featuredURL))}
            layout="fill"
            objectFit="cover"
            alt="Picture of the post"
            priority
          />
        ) : (
          <Image
            src={DefaultPostImg}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            alt="Default picture used for post"
          />
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;
