import React from "react";
import SecNavComponent from "./SecNav/SecNavComponent";
import TopNavComponent from "./TopNav/TopNavComponent";

const Header = () => {
  return (
    <header>
      <TopNavComponent />
      <SecNavComponent />
    </header>
  );
};

export default Header;
