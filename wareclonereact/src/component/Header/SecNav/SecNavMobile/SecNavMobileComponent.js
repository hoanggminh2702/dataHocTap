import React, { useEffect } from "react";
import Menu from "../Menu/Menu";
import MenuList from "./MenuList";
import "./SecNavMobileComponent.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const SecNavMobileComponent = () => {
  const username = useSelector((state) => state?.user.username);
  const [maxLength, setMaxlength] = useState(10);

  useEffect(() => {
    let firstWidth = window.innerWidth;
    if (firstWidth < 375) {
      setMaxlength(10);
    } else if (firstWidth >= 375 && firstWidth < 600) {
      setMaxlength(10);
    } else if (firstWidth >= 600 && firstWidth < 768) {
      setMaxlength(15);
    } else {
      setMaxlength(25);
    }

    const checkWidth = () => {
      let width = window.innerWidth;
      if (width < 375) {
        setMaxlength(10);
      } else if (width >= 375 && width < 600) {
        setMaxlength(10);
      } else if (width >= 600 && width < 768) {
        setMaxlength(15);
      } else {
        setMaxlength(25);
      }
    };
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

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
      title:
        (username?.length < maxLength
          ? username
          : `${username.slice(0, maxLength)}...`) || "User",
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
