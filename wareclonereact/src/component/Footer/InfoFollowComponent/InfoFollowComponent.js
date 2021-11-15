/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import "./InfoFollowComponent.css";

const InfoFollowComponent = () => {
  const marginRef = useRef();
  const handleResizeWindow = () => {
    if (window.innerWidth < 766) {
      marginRef.current.classList.remove("margin-l-l");
    } else {
      marginRef.current.classList.add("margin-l-l");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div ref={marginRef} className="info__follow margin-l-l">
      <h1 className="info__follow-title line-height-s">Follow us</h1>
      <div className="info__follow-social">
        <ul className="info__follow-social-list">
          <li className="info__follow-social-item">
            <a
              href="#"
              className="info__follow-social-link-facebook-icon
                                            info__follow-social-link"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>

          <li className="info__follow-social-item">
            <a
              href=""
              className="info__follow-social-link-instagram-icon
                                            info__follow-social-link"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>

          <li className="info__follow-social-item">
            <a
              href=""
              className="info__follow-social-link-google-icon
                                            info__follow-social-link"
            >
              <i className="fab fa-google-plus-g"></i>
            </a>
          </li>

          <li className="info__follow-social-item">
            <a
              href=""
              className="info__follow-social-link-youtube-icon
                                            info__follow-social-link"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="info__follow-newsletter">
        <h1
          className="info__follow-newsletter-title
                                    line-height-s"
        >
          Newsletter
        </h1>
        <div className="info__follow-newsletter-input-group">
          <input
            type="text"
            className="info__follow-newsletter-input"
            placeholder="Your email address"
          />
          <div className="info__follow-newsletter-btn">
            <i className="far fa-envelope" aria-hidden="true"></i>
          </div>
        </div>
        <div className="info__follow-end">
          <p className="info__follow-end-paragragh">
            You may unsubscribe at any moment. For that purpose, please find our
            contact info in the legal notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoFollowComponent;
