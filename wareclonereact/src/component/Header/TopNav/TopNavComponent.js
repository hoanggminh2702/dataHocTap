/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./topnav.css";

const TopNavComponent = () => {
  return (
    <section className="top-nav">
      <div
        className="top-nav__container
                    container-width"
      >
        <div className="top-nav__logo-container">
          <img
            src="https://d293e64rvqt2z5.cloudfront.net/ps17/demo14/img/demo14-logo-160206929121.jpg"
            alt=""
            className="top-nav__logo-img"
          />
        </div>
        <div className="top-nav__title-container">
          <h1 className="top-nav__title">We ship world wide!</h1>
        </div>
        <div className="top-nav__links-container">
          <ul className="top-nav__btn-list">
            <li className="top-nav__btn">
              <a href="" className="top-nav__btn-link">
                <i className="top-nav__btn-icon fas fa-search"></i>
              </a>
            </li>
            <li className="top-nav__btn">
              <a href="" className="top-nav__btn-link">
                <i className="top-nav__btn-icon fas fa-user"></i>
              </a>
            </li>
            <li className="top-nav__btn">
              <a href="" className="top-nav__btn-link cart-link">
                <i
                  className="top-nav__btn-icon fa
                                        fa-shopping-cart cart-icon"
                ></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopNavComponent;
