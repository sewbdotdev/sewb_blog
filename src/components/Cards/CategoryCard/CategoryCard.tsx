import Link from "next/link";
import React, { FunctionComponent } from "react";
import styles from "../Cards.module.css";
type CategoryCardProps = {
  title: string;
  slug: string;
};
const CategoryCard: FunctionComponent<CategoryCardProps> = (props) => {
  const { title, slug } = props;
  return (
    <div className={styles.categoryCardContainer}>
      <Link href={`/category/${slug}`}>
        <p className={styles.categoryCardItem}>{title}</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
