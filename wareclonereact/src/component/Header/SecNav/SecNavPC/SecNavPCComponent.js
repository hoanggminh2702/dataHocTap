/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./SecNavPCComponent.css";

const SecNavPCComponent = () => {
  return (
    <div className="pc-sec-nav__container container-width">
      <div className="pc-sec-nav__menu-container">
        <ul className="pc-sec-nav__menu-list">
          <li className="pc-sec-nav__menu-btn menu__btn--hover">
            <span className="pc-sec-nav__menu-btn-title">contact</span>
          </li>
        </ul>
      </div>
      <div className="pc-sec-nav__cart">
        <a href="#" className="pc-sec-nav__cart-link cart-link">
          <i className="pc-sec-nav__cart-icon fa fa-shopping-cart cart-icon"></i>
        </a>
      </div>
    </div>
  );
};

export default SecNavPCComponent;
