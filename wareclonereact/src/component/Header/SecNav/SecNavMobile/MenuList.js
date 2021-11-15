import React from "react";

const MenuList = ({ title, icon, onClick }) => {
  return (
    <li className="mobile-sec-nav__menu-btn menu__btn--hover" onClick={onClick}>
      <i className={`mobile-sec-nav__menu-btn-icon ${icon}`}></i>
      <span className="mobile-sec-nav__menu-btn-title">{title}</span>
    </li>
  );
};

export default MenuList;
