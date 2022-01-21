import React, { FunctionComponent } from "react";

const Feature: FunctionComponent = (props) => {
  return (
    <section className="border-b-2 border-gray-400 h-80 max-h-96">
      {props.children}
    </section>
  );
};

export default Feature;
