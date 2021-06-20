import React from "react";
import "./ProductList.css";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartListAddAction, cartListRemoveAction } from "../../Redux/Action/CartListAction";

const ProductList = (props) => {

  const { products } = props;

  let history = useHistory();

  const gotoDetailsPage = (id) => {
    history.push(`/products/${id}`, { product_id: id });
  };

  const dispatch = useDispatch();

  return (
    <div className="ProductPan">
      {products.map(data =>
        <div className="Product" key={data._id}>
          <div className="ProductName">
            <p>{data.product_name}</p>
          </div>
          <div className="ProductImage" onClick={() => gotoDetailsPage(data._id)}>
            <img src={data.product_image} alt="Product_image" />
            <div className="ProductImageText">
              <p>Product details</p>
            </div>
          </div>
          <div className="ProductExtraComment">
          </div>
          <div className="ProductWeight">
            <p>{data.product_weight}</p>
          </div>
          <div className="ProductPrice">
            <div className="Price">
              <p>{data.product_price}</p>
            </div>
            <div className="Price">
              <p>{data.product_currency}</p>
            </div>
          </div>
          {data.order_quantity === 0 ?
            <div className="ProductOrder">
              <div className="CartButtonDecrease">
                <p>-</p>
              </div>
              <div className="Cart">
                <p>Add to cart</p>
                <FontAwesomeIcon icon="shopping-cart" size="1x" className="CartIcon" />
              </div>
              <div className="CartButtonIncrease" onClick={() => dispatch(cartListAddAction(data))}>
                <p>+</p>
              </div>
            </div>
            :
            <div className="ProductOrder">
              <div className="CartButtonDecrease" onClick={() => dispatch(cartListRemoveAction(data))}>
                <p>-</p>
              </div>
              <div className="Cart">
                <p>{data.order_quantity} in cart</p>
              </div>
              <div className="CartButtonIncrease" onClick={() => dispatch(cartListAddAction(data))}>
                <p>+</p>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ProductList;
