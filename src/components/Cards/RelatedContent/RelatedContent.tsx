import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
import Image from "next/image";
import DefaultImage from "/public/img/dark-feature.png";
import { Post } from "@customTypes/generated/graphql";
import Helpers from "utils/helpers";

type RelatedContentProps = {
  post: Post;
};

const RelatedContent: FunctionComponent<RelatedContentProps> = (props) => {
  const { post } = props;
  const isImagePresent = Boolean(post.featuredImage.data?.attributes?.url);
  console.log(isImagePresent);
  return (
    <div className={styles.relatedContentContainer}>
      <div className={styles.contentCover}>
        {isImagePresent ? (
          <Image
            src={Helpers.getImageURL(
              String(post.featuredImage.data?.attributes?.url)
            )}
            alt={
              post.featuredImage.data?.attributes?.alternativeText ??
              "the featured image of the blog post."
            }
            layout="fixed"
            width={60}
            height={40}
          />
        ) : (
          <Image
            src={DefaultImage}
            alt="the featured image of the blog post."
            layout="fixed"
            width={60}
            height={40}
          />
        )}
      </div>
      <div className={styles.relatedContentTextContainer}>
        <h2 className={styles.relatedContentTitle}>{post.title}</h2>
        <p className={styles.relatedContentDescription}>
          {post.description?.substring(0, 40)}
        </p>
      </div>
    </div>
  );
};

export default RelatedContent;
