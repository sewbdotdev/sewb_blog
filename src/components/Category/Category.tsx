import React, { FunctionComponent } from "react";
import CategoryCard from "@/components/Cards/CategoryCard/CategoryCard";
import styles from "./Category.module.css";
import Tag from "../Tag";
import { CategoryOrTag } from "@customTypes/categoryandtag";

type CategoryOrTagProps = {
  isTag?: boolean;
  heading?: string;
  data: CategoryOrTag[];
};
const Category: FunctionComponent<CategoryOrTagProps> = (props) => {
  const {
    isTag = false,
    heading = "Discover More Of What You Love",
    data,
  } = props;
  console.log(isTag);
  if (data.length === 0) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{heading}</h3>

      <div className={styles.innerContainer}>
        {data.map((d) =>
          isTag ? (
            <Tag
              key={d.id}
              title={d.title}
              containerClassName="min-w-min"
              slug={d.slug}
            />
          ) : (
            <CategoryCard key={d.id} title={d.title} slug={d.slug} />
          )
        )}
      </div>
    </div>
  );
};

export default Category;
