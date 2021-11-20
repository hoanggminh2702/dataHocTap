import React from "react";
import Menu from "../Menu/Menu";
import MenuList from "./MenuList";
import "./SecNavMobileComponent.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const SecNavMobileComponent = () => {
  const username = useSelector((state) => state?.user.username);
  const navigate = useNavigate();
  const [isDisplay, setIsDisplay] = useState(false);

  const handleMenuClick = () => {
    setIsDisplay(true);
  };
  const handleHideMenu = () => {
    setIsDisplay(false);
  };
  const itemAttributes = [
    {
      title: "Menu",
      icon: "fas fa-bars",
      onClick: handleMenuClick,
    },
    {
      title: "Search",
      icon: "fa fa-search",
    },
    {
      title: username || "User",
      icon: "fas fa-user",
      onClick: () => navigate("/login"),
    },
    {
      title: "Cart",
      icon: "fas fa-shopping-cart",
    },
  ];
  return (
    <div className="mobile-sec-nav__container">
      <div className="mobile-sec-nav__menu-container">
        <Menu isDisplay={isDisplay} onClick={handleHideMenu} />
        <ul className="mobile-sec-nav__menu-list">
          {/* <li className="mobile-sec-nav__menu-btn menu__btn--hover">
            <i className="mobile-sec-nav__menu-btn-icon fas fa-bars"></i>
            <span className="mobile-sec-nav__menu-btn-title">Menu</span>
          </li>
          <li className="mobile-sec-nav__menu-btn menu__btn--hover">
            <i className="mobile-sec-nav__menu-btn-icon fa fa-search"></i>
            <span className="mobile-sec-nav__menu-btn-title">Search</span>
          </li>
          <li className="mobile-sec-nav__menu-btn menu__btn--hover">
            <i className="mobile-sec-nav__menu-btn-icon fa fa-user"></i>
            <span className="mobile-sec-nav__menu-btn-title">User</span>
          </li>
          <li className="mobile-sec-nav__menu-btn menu__btn--hover">
            <i className="mobile-sec-nav__menu-btn-icon fa fa-shopping-cart"></i>
            <span className="mobile-sec-nav__menu-btn-title">Cart</span>
          </li> */}
          {itemAttributes.map((att, index) => (
            <MenuList key={index} {...att} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecNavMobileComponent;
