import React from "react";
import "./InfoContactComponent.css";
const InfoContactComponent = () => {
  return (
    <div className="info__contact">
      <h1 className="info__contact-title line-height-s">Contact us</h1>
      <div className="info__contact-desc">
        <ul className="info__contact-desc-list">
          <li className="info__contact-desc-item">
            <span className="info__contact-desc-item-title">
              Công ty ABC Software
            </span>
          </li>
          <li className="info__contact-desc-item">
            <i
              className="fas fa-thumbtack
                                            info__contact-desc-icon"
              aria-hidden="true"
            ></i>
            <p
              className="info__contact-desc-detail
                                            margin-l-s"
            >
              Số 1 ngách 336/1 Nguyễn Trãi, phường Thanh Xuân Trung, quận Thanh
              Xuân, Hà Nội
            </p>
          </li>

          <li className="info__contact-desc-item">
            <i
              className="fa fa-phone
                                            info__contact-desc-icon"
              aria-hidden="true"
            ></i>
            <p
              className="info__contact-desc-detail
                                            margin-l-s"
            >
              777 777 777
            </p>
          </li>
          <li className="info__contact-desc-item">
            <i
              className="far fa-envelope
                                            info__contact-desc-icon"
              aria-hidden="true"
            ></i>
            <p
              className="info__contact-desc-detail
                                            margin-l-s"
            >
              hoanggminh2702@gmail.com
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoContactComponent;
