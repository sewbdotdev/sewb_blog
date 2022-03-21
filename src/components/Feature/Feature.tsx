import React, { FunctionComponent } from "react";
import styles from "./Feature.module.css";
import Image from "next/image";

const Feature: FunctionComponent = (props) => {
  return (
    <section className={styles.container}>
      <Image
        src="/img/dark-feature.png"
        alt="Featured image saying software engineering without borders with some tags like design patterns."
        layout="fill"
        priority={true}
      />
      {props.children}
    </section>
  );
};

export default Feature;
