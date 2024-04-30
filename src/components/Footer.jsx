import React from "react";
import IMAGE from "../components/images/uni_logo.png";

function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-text">
          <div className="footer-text-heading">Made By : </div>
          <div>Afreen Qamar</div>
          <div>Mohammad Ali</div>
          <div>Mohammad Shoaib</div>
        </div>
        <div className="footer-uni">
          <img src={IMAGE} alt="University Logo"></img>
        </div>
        <div className="footer-text-bottom">ⓒ 2023 - 2024</div>
      </footer>
    </div>
  );
}

export default Footer;
