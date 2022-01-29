import Link from "next/link";
import React, { FunctionComponent } from "react";
import styles from "./Tag.module.css";

type TagProps = {
  className?: string;
  title: string;
  containerClassName?: string;
  slug: string;
};
const Tag: FunctionComponent<TagProps> = (props) => {
  const { title, className, containerClassName, slug } = props;

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <Link href={`/tag/${slug}`}>
        <p className={`${styles.title} ${className}`}>{title}</p>
      </Link>
    </div>
  );
};

export default Tag;
