import React, { FunctionComponent } from "react";
import Feature from "../Feature";

type ContentProps = {
  featureURL?: string;
};
const Content: FunctionComponent<ContentProps> = (props) => {
  const { featureURL } = props;
  let imgURL: string;

  if (featureURL && featureURL.length > 0) {
    imgURL = featureURL;
  } else {
    imgURL = `/img/dark-feature.png`;
  }
  return (
    <section>
      <Feature imgURL={imgURL} />
      {props.children}
    </section>
  );
};

export default Content;
