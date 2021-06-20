import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faPinterestSquare,
  faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterBox">
        <div className="FooterInfo">
          <div className="FooterInfoHeader">
            <p>Business time</p>
          </div>
          <div className="FooterInfoDescription">
            <p>Sunday - Thursday: 09.00am to 07.00pm</p>
            <p>Saturday: 10.00am to 08.00pm</p>
            <p>Friday: Closed</p>
          </div>
        </div>
        <div className="FooterInfo">
          <div className="FooterInfoHeader">
            <p>Information</p>
          </div>
          <div className="FooterInfoDescription">
            <Link className="InfoBox" to="/aboutus">
              <div className="InfoBoxIcon">
                <FontAwesomeIcon icon="check-circle" size="sm" />
              </div>
              <div className="InfoBoxText">
                <p>About us</p>
              </div>
            </Link>
            <Link className="InfoBox" to="/privacypolicy">
              <div className="InfoBoxIcon">
                <FontAwesomeIcon icon="check-circle" size="sm" />
              </div>
              <div className="InfoBoxText">
                <p>Privacy policy</p>
              </div>
            </Link>
            <Link className="InfoBox" to="/termsconditions">
              <div className="InfoBoxIcon">
                <FontAwesomeIcon icon="check-circle" size="sm" />
              </div>
              <div className="InfoBoxText">
                <p>Terms &amp; conditions</p>
              </div>
            </Link>
            <Link className="InfoBox" to="/needhelp">
              <div className="InfoBoxIcon">
                <FontAwesomeIcon icon="check-circle" size="sm" />
              </div>
              <div className="InfoBoxText">
                <p>Need help</p>
              </div>
            </Link>
            <div className="InfoBoxSocial">
              <div className="InfoBoxTextSocial">
                <p>Get in touch</p>
              </div>
            </div>
            <div className="InfoBoxSocial">
              <div className="InfoBoxTextSocial">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="SocialIcon" icon={faFacebookSquare} size="sm" title="Facebook" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="SocialIcon" icon={faInstagramSquare} size="sm" title="Instagram" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="SocialIcon" icon={faTwitterSquare} size="sm" title="Twitter" />
                </a>
                <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="SocialIcon" icon={faPinterestSquare} size="sm" title="Pinterest" />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="SocialIcon" icon={faYoutubeSquare} size="sm" title="Youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="FooterInfo">
          <div className="FooterInfoHeader">
            <p>Contact us</p>
          </div>
          <div className="FooterInfoDescription">
            <div className="AddressBox">
              <div className="AddressBoxIcon">
                <FontAwesomeIcon icon="map-marker-alt" size="sm" />
              </div>
              <div className="AddressBoxText">
                <p>Address: Jamuna future park,</p>
              </div>
            </div>
            <div className="AddressBox">
              <div className="AddressBoxIcon">
              </div>
              <div className="AddressBoxText">
                <p>Bashundhara, Dhaka, Bangladesh.</p>
              </div>
            </div>
            <div className="AddressBox">
              <div className="AddressBoxIcon">
                <FontAwesomeIcon icon="phone-square-alt" size="sm" />
              </div>
              <div className="AddressBoxText">
                <p>Phone: +880-187-9272-291</p>
              </div>
            </div>
            <div className="AddressBox">
              <div className="AddressBoxIcon">
                <FontAwesomeIcon icon="envelope" size="sm" />
              </div>
              <div className="AddressBoxText">
                <p>Email: support@dokan.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="FooterCopyRight">
        <p>All rights reserved. © 2021 Made by <a href="https://github.com/Shaikot007" target="_blank" rel="noopener noreferrer">Shaikot</a></p>
      </div>
    </div>
  );
};

export default Footer;
