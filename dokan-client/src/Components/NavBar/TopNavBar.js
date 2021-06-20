import React from "react";
import "./TopNavBar.css";
import { CustomInput } from "reactstrap";
import SaleCarousel from "../Carousel/SaleCarousel";

const TopNavBar = (props) => {

  const { toggle } = props;

  return (
    <div className="TopNavbar">
      <div className="ToggleSideBar">
        <CustomInput type="switch" id="customSwitch" onClick={toggle} defaultChecked />
      </div>
      <div className="SaleOffBox">
        <SaleCarousel />
      </div>
    </div>
  );
};

export default TopNavBar;
