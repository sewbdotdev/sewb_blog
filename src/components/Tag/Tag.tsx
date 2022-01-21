import React, { FunctionComponent } from "react";
import styles from "./Tag.module.css";
const Tag: FunctionComponent = () => {
  return (
    <div className={`${styles.container} dark:border-gray-600 dark:bg-gray-600`}>
      <p className={`${styles.title} dark:text-slate-50`}>Medium</p>
    </div>
  );
};

export default Tag;
