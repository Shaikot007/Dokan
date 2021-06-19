import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./BottomNavBar.css";
import { setNameFilterAndFetchProducts } from "../../Redux/Action/ProductAction";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dokan_logo from "../../Images/Brand_logo/Dokan_logo.png";
import Cart_logo from "../../Images/Cart_image/Cart_image.png";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

const BottomNavBar = (props) => {

  const { cartData, grandTotalPrice } = props;

  const [productName, setProductName] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  //Get data from local storage
  const user_token = localStorage.getItem("myToken");
  const user_name = localStorage.getItem("userName");

  const delete_token = (event) => {
    event.preventDefault();
    history.push(`/`);
    localStorage.clear();
  };

  //Toggle dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  //Toggle navbar menu
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleNavMenu = () => setNavMenuOpen(!navMenuOpen);

  return (
    <div className="BottomNavbar">
      <Link className="Link" to="/">
        <div className="NavbarBrand">
          <img src={Dokan_logo} alt="Brand_logo" />
        </div>
        <div className="NavbarBrandText">
          <p>Dokan</p>
        </div>
      </Link>
      <div className="NavItems">
        <div className="SearchBox">
          <InputGroup>
            <Input placeholder="Search for products name" value={productName}
              onInput={(event) => setProductName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  dispatch(setNameFilterAndFetchProducts(productName))
                }
              }}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <FontAwesomeIcon icon="search" size="lg" className="SearchIcon"
                  onClick={() => dispatch(setNameFilterAndFetchProducts(productName))}
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Link className="Link" to="/cartlist">
          <Button className="CartBox" title="Cart">
            <div className="CartCount">
              <img src={Cart_logo} alt="Cart_image" />
              <div className="CartCountText">
                {cartData.length === 0 ? <p>{cartData.length}</p> :
                  cartData.length < 10 ? <p>0{cartData.length}</p> : <p>{cartData.length}</p>
                }
              </div>
            </div>
            <div className="CartMoney">
              <div className="CartMoneyText">
                <p>Cart price</p>
              </div>
              <div className="CartMoneySum">
                <p>৳ {grandTotalPrice}</p>
              </div>
            </div>
          </Button>
        </Link>
        {user_token === null ?
          <Link className="Link" to="/signin">
            <div className="RegisterBox">
              <p>Sign in</p>
            </div>
          </Link>
          :
          <div className="Link">
            <UncontrolledDropdown nav inNavbar isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                {user_name}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => history.push("/orderhistory")}>Order history</DropdownItem>
                <DropdownItem onClick={delete_token}>Sign out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        }
      </div>
      <Dropdown isOpen={navMenuOpen} toggle={toggleNavMenu} className="CollapseNavItems">
        <DropdownToggle>
          <FontAwesomeIcon icon="bars" size="lg" className="NavMenu" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem text>
            <div className="CollapseSearchBox">
              <InputGroup>
                <Input placeholder="Search products" value={productName}
                  onInput={(event) => setProductName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      dispatch(setNameFilterAndFetchProducts(productName))
                    }
                  }}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <FontAwesomeIcon icon="search" size="sm" className="CollapseSearchIcon"
                      onClick={() => dispatch(setNameFilterAndFetchProducts(productName))}
                    />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem text>
            <Link className="CollapseLink" to="/cartlist">
              <Button className="CollapseCartBox" title="Cart">
                <div className="CollapseCartCount">
                  <img src={Cart_logo} alt="Cart_image" />
                  <div className="CollapseCartCountText">
                    {cartData.length === 0 ? <p>{cartData.length}</p> :
                      cartData.length < 10 ? <p>0{cartData.length}</p> : <p>{cartData.length}</p>
                    }
                  </div>
                </div>
                <div className="CollapseCartMoney">
                  <div className="CollapseCartMoneyText">
                    <p>Cart price</p>
                  </div>
                  <div className="CollapseCartMoneySum">
                    <p>৳ {grandTotalPrice}</p>
                  </div>
                </div>
              </Button>
            </Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem text>
            {user_token === null ?
              <Link className="CollapseLink" to="/signin">
                <div className="CollapseRegisterBox">
                  <p>Sign in</p>
                </div>
              </Link>
              :
              <div className="CollapseLink">
                <UncontrolledDropdown nav inNavbar isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>
                    {user_name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => history.push("/orderhistory")}>Order history</DropdownItem>
                    <DropdownItem onClick={delete_token}>Sign out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            }
          </DropdownItem>
        </DropdownMenu>
      </Dropdown >
    </div >
  );
};

export default BottomNavBar;
