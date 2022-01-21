import React, { FunctionComponent } from "react";
import styles from "./Tag.module.css";
const Tag: FunctionComponent = () => {
  return (
    <div className={`${styles.container}`}>
      <p className={`${styles.title} `}>Algorithms</p>
    </div>
  );
};

export default Tag;
