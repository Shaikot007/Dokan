import React from "react";
import "./PrivacyPolicy.css";
import InfoImage from "../../../Images/Info-image/eCommerce.jpg";
import Footer from "../../Footer/Footer";

function PrivacyPolicy() {
  return (
    <div className="PrivacyPolicy">
      <div className="InfoImage">
        <img src={InfoImage} alt="Banner" />
      </div>
      <div className="PrivacyPolicyHeadline">
        <h3>Privacy policy</h3>
      </div>
      <div className="PrivacyPolicyText">
        <p>When you use our website, we collect and store your personal information which is provided by
        you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth,
        and customized experience. This allows us to provide services and features that most likely meet
        your needs and to customize our website to make your experience safer and easier. More importantly,
        while doing so, we collect personal information from you that we consider necessary for achieving
        this purpose.</p>
        <p>Below are some of the ways in which we collect and store your information:</p>
        <ul>
          <li>We receive and store any information you enter on our website or give us in any other way. We
          use the information that you provide for such purposes as responding to your requests, customizing
          future shopping for you, improving our stores, and communicating with you.</li>
          <li>We also store certain types of information whenever you interact with us. For example, like many
          websites, we use "cookies," and we obtain certain types of information when your web browser accesses
          dokan.com or advertisements and other content served by or on behalf of dokan.com on other websites.</li>
          <li>To help us make e-mails more useful and interesting, we often receive a confirmation when you
          open an e-mail from Dokan if your computer supports such capabilities.</li>
        </ul>
        <p>Information about our customers is an important part of our business and we are not in the business
        of selling it to others.</p>
        <p>We release account and other personal information when we believe release is appropriate to comply
        with the law; enforce or apply our terms of use and other agreements; or protect the rights, property,
        or safety of dokan.com, our users, or others. This includes exchanging information with other companies
        and organizations for fraud protection.</p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
