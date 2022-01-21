import React, { FunctionComponent } from "react";
import styles from "./Feature.module.css";
import Image from "next/image";

type FeatureProps = {
  imgURL: string;
};
const Feature: FunctionComponent<FeatureProps> = (props) => {
  return (
    <section className={styles.container}>
      <Image
        src={props.imgURL}
        alt="Featured image saying software engineering without borders with some tags like design patterns."
        layout="fill"
        objectFit="fill"
        priority={true}
      />
      {props.children}
    </section>
  );
};

export default Feature;
