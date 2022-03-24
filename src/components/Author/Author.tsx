import React, { FunctionComponent } from "react";
import styles from "./Author.module.css";
import DefaultUser from "/public/img/default-user.png";
import Image from "next/image";
import { UsersPermissionsUser } from "@customTypes/generated/graphql";
import Helpers from "utils/helpers";

type AuthorProps = {
  data: UsersPermissionsUser;
};

const Author: FunctionComponent<AuthorProps> = (props) => {
  const { data } = props;
  const isImagePresent = Boolean(data.avatar?.data?.attributes?.url);
  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        {isImagePresent ? (
          <Image
            src={Helpers.getImageURL(
              String(data.avatar?.data?.attributes?.url)
            )}
            alt={`${data.username} image.`}
            width={80}
            height={100}
          />
        ) : (
          <Image
            src={DefaultUser}
            alt="a default user image"
            width={80}
            height={100}
          />
        )}
        <h3 className={styles.name}>{data.username}</h3>
        <p className={styles.bio}>
          {data.bio ?? "Update your bio in your profile :)"}
        </p>
        <div className={styles.linkContainer}>
          {data.twitterUrl && (
            <a className={styles.linkText} href={data.twitterUrl}>
              Twitter
            </a>
          )}
          {data.linkedinUrl && (
            <a className={styles.linkText} href={data.linkedinUrl}>
              Linkedin
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
export default Author;
