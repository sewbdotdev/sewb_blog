import React, { FunctionComponent } from "react";
import styles from "./Feature.module.css";
const Feature: FunctionComponent = (props) => {
  return <section className={styles.container}>{props.children}</section>;
};

export default Feature;
