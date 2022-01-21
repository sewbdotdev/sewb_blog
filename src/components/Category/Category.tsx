import React, { FunctionComponent } from "react";
import styles from "./Category.module.css";
const Category: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Discover More Of What You Love</h3>
      <div className={styles.innerContainer}>
        <p>Software Architecture</p>
        <p>Software Architecture</p>
        <p>Software Architecture</p>
        <p>Software Architecture</p>
        <p>Software Architecture</p>
        <p>Software Architecture</p>
        <p>Software Architecture</p>
      </div>
    </div>
  );
};

export default Category;
