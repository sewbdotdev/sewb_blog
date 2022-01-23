import Image from "next/image";
import React, { FunctionComponent } from "react";
import RelatedContent from "../Cards/RelatedContent";
import styles from "./Related.module.css";
import TestImage1 from "/public/img/test-1.jpg";
const Related: FunctionComponent = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Related</h3>
      <RelatedContent />
      <RelatedContent />
      <RelatedContent />
      <RelatedContent />
    </section>
  );
};

export default Related;
