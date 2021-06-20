import React, { useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, Label, Input, Button } from "reactstrap";
import FlashSale from "../../Images/Carousel-images/Sale-carousel/Flash-sale.gif";
import {
  setCategoryFilterAndFetchProducts,
  setPriceFilterAndFetchProducts,
  setCountryFilterAndFetchProducts
} from "../../Redux/Action/ProductAction";

const Sidebar = () => {

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();

  const categoriesData = useSelector(state => state.categories);
  const countriesData = useSelector(state => state.countries);

  return (
    <div className="Sidebar">
      <div className="Nav">
        <div className="NavItemCategory">
          <div className="Category">
            <div className="CategoryIcon">
              <FontAwesomeIcon icon="th" size="lg" />
            </div>
            <div className="CategoryText">
              <p>Category</p>
            </div>
          </div>
        </div>
        {categoriesData.map(data =>
          <div className="NavItem" key={data._id}>
            <div className="Category"
              onClick={() => dispatch(setCategoryFilterAndFetchProducts(data.product_category))}>
              <div className="CategoryIcon">
                <FontAwesomeIcon icon={data.product_icon} size="sm" />
              </div>
              <div className="SubCategoryText">
                <p>{data.product_category}</p>
              </div>
            </div>
          </div>
        )}
        <div className="NavItemPrice">
          <div className="Category">
            <div className="CategoryIcon">
              <FontAwesomeIcon icon="coins" size="lg" />
            </div>
            <div className="CategoryText">
              <p>Price</p>
            </div>
          </div>
        </div>
        <div className="PriceFilter">
          <div className="InputBox">
            <div className="PriceInput">
              <input type="number" min="0" placeholder="Min" value={minPrice}
                onInput={(event) => setMinPrice(event.target.value)} />
            </div>
            <div className="PriceHash">
              <p>-</p>
            </div>
            <div className="PriceInput">
              <input type="number" min="0" placeholder="Max" value={maxPrice}
                onInput={(event) => setMaxPrice(event.target.value)} />
            </div>
          </div>
          <div className="FilterButton">
            <Button color="warning" onClick={() => dispatch(setPriceFilterAndFetchProducts(
              {
                min_price: minPrice,
                max_price: maxPrice
              }
            ))} >
              Search
            </Button>
          </div>
        </div>
        <div className="NavItemPrice">
          <div className="Category">
            <div className="CategoryIcon">
              <FontAwesomeIcon icon="globe" size="lg" />
            </div>
            <div className="CategoryText">
              <p>Country</p>
            </div>
          </div>
        </div>
        {countriesData.map(data =>
          <div className="CountryNavItem" key={data._id}>
            <div className="Country">
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="country"
                    onClick={() => dispatch(setCountryFilterAndFetchProducts(data.product_country))}
                  />
                  {data.product_country}
                </Label>
              </FormGroup>
            </div>
          </div>
        )}
        <div className="SaleAdvertise">
          <img src={FlashSale} alt="Flash_sale" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
