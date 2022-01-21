import React, { FunctionComponent } from "react";
import CategoryCard from "@/components/Cards/CategoryCard/CategoryCard";
import styles from "./Category.module.css";
const Category: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Discover More Of What You Love</h3>
      <div className={styles.innerContainer}>
        <CategoryCard title="Software Architecture" />
        <CategoryCard title="Software Architecture" />
        <CategoryCard title="Software Architecture" />
        <CategoryCard title="Software Architecture" />
        <CategoryCard title="Machine Learning" />
        <CategoryCard title="Machine Learning" />
        <CategoryCard title="Machine Learning" />
        <CategoryCard title="Machine Learning" />
      </div>
    </div>
  );
};

export default Category;
