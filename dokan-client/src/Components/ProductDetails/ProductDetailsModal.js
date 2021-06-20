import React, { useEffect, useState } from "react";
import "./ProductDetailsModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductDetailsAction } from "../../Redux/Action/ProductAction";
import { cartListAddAction, cartListRemoveAction } from "../../Redux/Action/CartListAction";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetailsModal = (props) => {

  const { className, products } = props;

  let history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetailsAction(id));
  }, [id, dispatch]);

  const [productModal, setProductModal] = useState(true);
  const toggle = () => {
    setProductModal(!productModal);
    history.goBack();
  };

  const productsDetailsData = useSelector(state => state.products.products_details);

  const product = products.find(data => data._id === id);

  return (
    <div>
      <Modal isOpen={productModal} toggle={toggle} className={className} size="xl">
        <ModalHeader className="ModalHeader" toggle={toggle}>{productsDetailsData.product_name}</ModalHeader>
        <ModalBody className="ModalBody">
          <div className="ModalBodyInfo">
            <div className="InfoItemImaga">
              <img src={productsDetailsData.product_image} alt="Product_image" />
            </div>
            <div className="InfoItem">
              <div className="InfoItemText">
                <p>{productsDetailsData.product_weight}</p>
              </div>
              <div className="InfoItemText">
                <p>{productsDetailsData.product_price} {productsDetailsData.product_currency}</p>
              </div>
              <div className="InfoItemText">
                <p>Made in {productsDetailsData.product_country}</p>
              </div>
              <div className="InfoItemText">
              </div>
              <div className="InfoItemCart">
                {product.order_quantity === 0 ?
                  <div className="InfoItemCartButton">
                    <div className="InfoItemCartDecrease">
                      <p>-</p>
                    </div>
                    <div className="InfoCart">
                      <p>Add to cart</p>
                      <FontAwesomeIcon icon="shopping-cart" size="lg" className="InfoItemCartIcon" />
                    </div>
                    <div className="InfoItemCartIncrease" onClick={() => dispatch(cartListAddAction(product))}>
                      <p>+</p>
                    </div>
                  </div>
                  :
                  <div className="InfoItemCartButton">
                    <div className="InfoItemCartDecrease" onClick={() => dispatch(cartListRemoveAction(product))}>
                      <p>-</p>
                    </div>
                    <div className="InfoCart">
                      <p>{product.order_quantity} in cart</p>
                    </div>
                    <div className="InfoItemCartIncrease" onClick={() => dispatch(cartListAddAction(product))}>
                      <p>+</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="ModalBodyDetails">
            {productsDetailsData.product_details}
          </div>
        </ModalBody>
        <ModalFooter className="ModalFooter">
          <div className="ModalFooterInfo">
            <div className="DeliveryInfo">
              <div className="DeliveryMethod">
                <div className="ModalFooterImage">
                  <img src={productsDetailsData.delivery_image} alt="Delivery_image" />
                </div>
                <div className="ModalFooterImageText">
                  <p>{productsDetailsData.delivery_text}</p>
                </div>
              </div>
              <div className="DeliveryMethod">
                <div className="ModalFooterImage">
                  <img src={productsDetailsData.cash_image} alt="Delivery_image" />
                </div>
                <div className="ModalFooterImageText">
                  <p>{productsDetailsData.cash_text}</p>
                </div>
              </div>
            </div>
            <div className="PaymentInfo">
              <div className="ModalFooterImageText">
                <p>{productsDetailsData.payment_text}</p>
              </div>
              <div className="ModalFooterImage">
                <img src={productsDetailsData.american_express_image} alt="Payment_methods_image" />
              </div>
              <div className="ModalFooterImage">
                <img src={productsDetailsData.master_card_image} alt="Payment_methods_image" />
              </div>
              <div className="ModalFooterImage">
                <img src={productsDetailsData.visa_card_image} alt="Payment_methods_image" />
              </div>
              <div className="ModalFooterImage">
                <img src={productsDetailsData.bcash_image} alt="Payment_methods_image" />
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductDetailsModal;
