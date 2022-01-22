import React, { FunctionComponent } from "react";

type ContentProps = {
  classNames?: string;
};
const Content: FunctionComponent<ContentProps> = (props) => {
  return <section className={props.classNames}>{props.children}</section>;
};

export default Content;
