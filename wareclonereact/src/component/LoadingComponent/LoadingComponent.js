import React from "react";
import { SpinnerCircularSplit } from "spinners-react";

const LoadingComponent = () => {
  console.log("Login render");
  return (
    <div style={{ display: "flex" }}>
      <SpinnerCircularSplit
        size={100}
        still={false}
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default LoadingComponent;
