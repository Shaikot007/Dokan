import React from "react";
import "./AboutUs.css";
import InfoImage from "../../../Images/Info-image/eCommerce.jpg";
import Footer from "../../Footer/Footer";

function AboutUs() {
  return (
    <div className="AboutUs">
      <div className="InfoImage">
        <img src={InfoImage} alt="Banner" />
      </div>
      <div className="AboutUsHeadline">
        <h3>About us</h3>
      </div>
      <div className="AboutUsText">
        <p>Dokan is an online shop in Dhaka city, Bangladesh. We believe product quality and on-time
        delivery is valuable to our customers, and that they should not have to waste money, bad
        product and wait in line just to buy basic necessities like Grocery Shop! This is why Dokan
        delivers everything you need right at your doorstep.</p>
        <p>Dokan is a work in progress, and we hope to get better over time. We are firm believers in
        using technology and education to improve Bangladesh, and we will continue to invest all our
        effort in pushing the boundaries of technology.</p>
        <p>If you have ideas on how we can improve, we would love to hear from you. Please do email us
        at support@dokan.com.</p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
