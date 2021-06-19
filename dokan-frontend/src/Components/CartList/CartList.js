import React, { useState } from "react";
import "./CartList.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartListAddAction, cartListRemoveAction, cartItemDeleteAction } from "../../Redux/Action/CartListAction";
import { submitOrderAction } from "../../Redux/Action/OrderAction";
import CartListImage from "../../Images/CartList_image/grocery.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

const CartList = (props) => {

  const { className, cartData, subTotalPrice, taxPrice, deliveryPrice, grandTotalPrice } = props;

  let history = useHistory();
  const dispatch = useDispatch();

  const [cartModal, setCartModal] = useState(true);
  const toggle = () => {
    setCartModal(!cartModal);
    history.goBack();
  };

  const gotoProductsPage = () => {
    //Get data from local storage
    const user_token = localStorage.getItem("myToken");
    user_token !== null ? history.push(`/`) : history.push(`/signin`);
  };

  const [payment, setPayment] = useState("");

  return (
    <div>
      <Modal isOpen={cartModal} toggle={toggle} className={className} size="xl">
        <ModalHeader toggle={toggle}>
          <div className="CartListImage">
            <img src={CartListImage} alt="grocery-product" />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="CartList">
            <div className="CartListItem">
              <div className="CartListHeader">
                <div className="HeaderName">
                  <p>Product name</p>
                </div>
                <div className="HeaderPrice">
                  <p>Price</p>
                </div>
                <div className="HeaderQuantity">
                  <p>Quantity</p>
                </div>
                <div className="HeaderTotal">
                  <p>Total</p>
                </div>
                <div className="HeaderRemove">
                </div>
              </div>
              {cartData.length === 0 ?
                <div className="CartProductList">
                  <h2>Cart is empty</h2>
                </div>
                :
                cartData.map(data =>
                  <div className="CartProductList" key={data._id}>
                    <div className="CartProductImage">
                      <img src={data.product_image} alt="grocery-product" />
                    </div>
                    <div className="CartProductName">
                      <p>{data.product_name}</p>
                    </div>
                    <div className="CartProductPrice">
                      <p>{data.product_price} {data.product_currency} per {data.product_weight}</p>
                    </div>
                    <div className="CartProductQuantity">
                      <p className="QuantityButton" onClick={() => dispatch(cartListRemoveAction(data))}>-</p>
                      <p>{data.order_quantity}</p>
                      <p className="QuantityButton" onClick={() => dispatch(cartListAddAction(data))}>+</p>
                    </div>
                    <div className="CartProductTotal">
                      <p>{(data.order_quantity * data.product_price).toFixed(2)} {data.product_currency}</p>
                    </div>
                    <div className="CartProductRemove">
                      <FontAwesomeIcon onClick={() => dispatch(cartItemDeleteAction(data))} icon="times-circle" size="lg" className="RemoveIcon" title="Remove" />
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="OrderSummaryBox">
            <div className="PaymentMethod">
              <h5>Payment methods</h5>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="payment"
                    onClick={() => setPayment("American express")}
                  />
                  American express
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="payment"
                    onClick={() => setPayment("Master card")}
                  />
                  Master card
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="payment"
                    onClick={() => setPayment("Visa card")}
                  />
                  Visa card
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="payment"
                    onClick={() => setPayment("bCash")}
                  />
                  bCash
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="payment"
                    onClick={() => setPayment("Cash on delivery")}
                  />
                  Cash on delivery
                </Label>
              </FormGroup>
            </div>
            <div className="OrderSummary">
              <div className="SummaryHeader">
                <p>Order summary</p>
              </div>
              <div className="SubTotalBox">
                <div className="SubTotalText">
                  <p>Sub total</p>
                </div>
                <div className="SubTotal">
                  <p>Tk. {subTotalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="SubTotalBox">
                <div className="SubTotalText">
                  <p>Tax</p>
                </div>
                <div className="SubTotal">
                  <p>Tk. {taxPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="SubTotalBox">
                <div className="SubTotalText">
                  <p>Delivery cost</p>
                </div>
                <div className="SubTotal">
                  <p>Tk. {deliveryPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="GrandTotalBox">
                <div className="SubTotalText">
                  <p>Grand total</p>
                </div>
                <div className="SubTotal">
                  <p>Tk. {grandTotalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="CheckOutBox">
                <Button color="success"
                  onClick={() => {
                    gotoProductsPage();
                    dispatch(submitOrderAction({
                      order: cartData,
                      payment_method: payment,
                      payment: {
                        subTotalPrice: subTotalPrice.toFixed(2),
                        taxPrice: taxPrice.toFixed(2),
                        deliveryPrice: deliveryPrice.toFixed(2),
                        grandTotalPrice: grandTotalPrice.toFixed(2)
                      }
                    }));
                  }}
                >
                  Check out
                </Button>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CartList;
