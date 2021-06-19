import React from "react";
import "./OrderHistory.css";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import OrderImage from "../../Images/Order_image/ecommerce_order.jpg";
import Footer from "../../Components/Footer/Footer";

function OrderHistory() {

  //For order history
  const orderData = useSelector(state => state.order);

  return (
    <div className="OrderHistory">
      <div className="OrderImage">
        <img src={OrderImage} alt="Order_Banner" />
      </div>
      {orderData.length === 0 ?
        <div className="OrderHistoryTable">
          <div className="OrderHistoryHeadline">
            <h3>Order history</h3>
          </div>
          <div className="OrderHistoryBody">
            <p>Order history is empty</p>
          </div>
        </div>
        :
        <div className="OrderHistoryTable">
          <div className="OrderHistoryHeadline">
            <h3>Order history</h3>
          </div>
          <Table responsive>
            <thead style={{ fontSize: "15px", backgroundColor: "Cyan" }}>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment method</th>
                <th>Total items</th>
                <th>Total price</th>
              </tr>
            </thead>
            {orderData.map((data, index) =>
              <tbody style={{ fontSize: "15px" }} key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.date}</td>
                  <td>{data.time}</td>
                  <td>{data.user_order.payment_method}</td>
                  <td>{data.user_order.order.length}</td>
                  <td>{data.user_order.payment.grandTotalPrice} Taka</td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
      }
      <Footer />
    </div>
  );
};

export default OrderHistory;
