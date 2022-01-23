import React, { FunctionComponent } from "react";
import CategoryCard from "@/components/Cards/CategoryCard/CategoryCard";
import styles from "./Category.module.css";
import Tag from "../Tag";

type CategoryOrTagProps = {
  isTag?: boolean;
  heading?: string;
};
const Category: FunctionComponent<CategoryOrTagProps> = (props) => {
  const { isTag = false, heading = "Discover More Of What You Love" } = props;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  console.log(isTag);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{heading}</h3>

      <div className={styles.innerContainer}>
        {data.map((d) =>
          isTag ? (
            <Tag
              key={d}
              title="Software Architecture"
              containerClassName="min-w-min"
            />
          ) : (
            <CategoryCard key={d} title="Software Architecture" />
          )
        )}
      </div>
    </div>
  );
};

export default Category;
