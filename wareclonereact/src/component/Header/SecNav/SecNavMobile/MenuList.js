import React from "react";

const MenuList = ({ title, icon, onClick, children }) => {
  return (
    <li className="mobile-sec-nav__menu-btn menu__btn--hover" onClick={onClick}>
      <i
        className={`mobile-sec-nav__menu-btn-icon ${icon}`}
        style={{ position: "relative" }}
      >
        {children}
      </i>

      <span className="mobile-sec-nav__menu-btn-title">{title}</span>
    </li>
  );
};

export default MenuList;
