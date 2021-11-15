import React from "react";
import Search from "../../component/Search/Search";

const Homepage = () => {
  return (
    <>
      <Search />
      <div style={{ backgroundColor: "orange", height: "600px" }}>
        Đây là phần thân
      </div>
    </>
  );
};

export default Homepage;
