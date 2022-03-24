import React, { FunctionComponent } from "react";

type DataWrapperProps = {
  status: "loading" | "error" | "success" | "idle";
};

const DataWrapper: FunctionComponent<DataWrapperProps> = (props) => {
  const { status } = props;
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error...</p>;
  }

  return <>{props.children}</>;
};

export default DataWrapper;
