import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
type CategoryCardProps = {
  title: string;
};
const CategoryCard: FunctionComponent<CategoryCardProps> = (props) => {
  return (
    <div className={styles.categoryCardContainer}>
      <p className={styles.categoryCardItem}>{props.title}</p>
    </div>
  );
};

export default CategoryCard;
