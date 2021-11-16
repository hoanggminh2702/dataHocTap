/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./topnav.css";
import Search from "../../Search/Search.js";

const TopNavComponent = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <section className="top-nav">
      <div className="top-nav__container container-width">
        <div
          className="top-nav__logo-container"
          onClick={() => (window.location = "./")}
        >
          <img
            src="https://d293e64rvqt2z5.cloudfront.net/ps17/demo14/img/demo14-logo-160206929121.jpg"
            alt="Homepage"
            className="top-nav__logo-img"
          />
        </div>
        <div className="top-nav__title-container">
          <h1 className="top-nav__title">We ship world wide!</h1>
        </div>
        <div className="top-nav__links-container">
          <ul className="top-nav__btn-list">
            <li
              className="top-nav__btn"
              onClick={(e) => {
                e.preventDefault();
                setIsSearch(true);
              }}
            >
              <a href="#" className="top-nav__btn-link">
                <i className="top-nav__btn-icon fas fa-search"></i>
              </a>
            </li>
            {isSearch && <Search setIsSearch={setIsSearch} />}
            <li className="top-nav__btn">
              <a href="./login" className="top-nav__btn-link">
                <i className="top-nav__btn-icon fas fa-user"></i>
              </a>
            </li>
            <li className="top-nav__btn">
              <a href="#" className="top-nav__btn-link cart-link">
                <i className="top-nav__btn-icon fa fa-shopping-cart cart-icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopNavComponent;