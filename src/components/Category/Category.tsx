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
              title={d.attributes.title}
              containerClassName="min-w-min"
              slug={d.attributes.slug}
            />
          ) : (
            <CategoryCard
              key={d.id}
              title={d.attributes.title}
              slug={d.attributes.slug}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Category;
