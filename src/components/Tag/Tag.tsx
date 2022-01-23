import React, { FunctionComponent } from "react";
import styles from "./Tag.module.css";

type TagProps = {
  className?: string;
  title: string;
  containerClassName?: string;
};
const Tag: FunctionComponent<TagProps> = (props) => {
  const { title, className, containerClassName } = props;

  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <p className={`${styles.title} ${className}`}>{title}</p>
    </div>
  );
};

export default Tag;
