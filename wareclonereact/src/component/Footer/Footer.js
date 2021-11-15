import React from "react";
import InfoContactComponent from "./InfoContactComponent/InfoContactComponent";
import InfoFollowComponent from "./InfoFollowComponent/InfoFollowComponent";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="info container-width">
        <InfoContactComponent />
        <InfoFollowComponent />
      </div>
    </footer>
  );
};

export default Footer;
