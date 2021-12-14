/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./topnav.css";
import Search from "../../Search/Search.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Notification from "../../Notification/Notification";
import User from "../../User/User";

const TopNavComponent = () => {
  const [isSearch, setIsSearch] = useState(false);
  const ordersLength = useSelector((state) => state.orders.orders).length;
  const [isDisplayLogOut, setIsDisplayLogOut] = useState(false);
  const [mount, setMount] = useState("btn-fadeIn");
  const user = useSelector((state) => state.user?.username);
  return (
    <section className="top-nav">
      <div className="top-nav__container container-width">
        <div className="top-nav__logo-container">
          <Link to="/">
            <img
              src="https://d293e64rvqt2z5.cloudfront.net/ps17/demo14/img/demo14-logo-160206929121.jpg"
              alt="Homepage"
              className="top-nav__logo-img"
            />
          </Link>
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
            <li
              className="top-nav__btn"
              onMouseEnter={(e) => {
                setMount("btn-fadeIn");
                setIsDisplayLogOut(true);
              }}
              onMouseLeave={(e) => {
                setMount("btn-fadeOut");
                setTimeout(() => {
                  setIsDisplayLogOut(false);
                }, 190);
              }}
            >
              <Link to="/login" className="top-nav__btn-link">
                <i className="top-nav__btn-icon fas fa-user"></i>
                {isDisplayLogOut && user ? (
                  <User
                    setIsDisplayLogOut={setIsDisplayLogOut}
                    setMount={setMount}
                    mount={mount}
                    top="44px"
                    right="44px"
                  />
                ) : (
                  <></>
                )}
              </Link>
            </li>
            <li className="top-nav__btn">
              <Link to="/order" className="top-nav__btn-link cart-link">
                <i className="top-nav__btn-icon fa fa-shopping-cart cart-icon">
                  {ordersLength ? (
                    <Notification top="12px" right="12px" />
                  ) : (
                    <></>
                  )}
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopNavComponent;
