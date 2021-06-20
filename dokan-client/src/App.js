import React, { useState } from "react";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import { store } from "./Redux/Store/Store";
import { library } from "@fortawesome/fontawesome-svg-core";
import TopNavBar from "./Components/NavBar/TopNavBar";
import BottomNavBar from "./Components/NavBar/BottomNavBar";
import Home from "./Components/Home/Home";
import ProductDetailsModal from "./Components/ProductDetails/ProductDetailsModal";
import CartList from "./Components/CartList/CartList";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import ForgotPassword from "./Components/Password/ForgotPassword";
import ResetPassword from "./Components/Password/ResetPassword";
import AboutUs from "./Components/Information/AboutUs/AboutUs";
import PrivacyPolicy from "./Components/Information/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Components/Information/TermsAndConditions/TermsAndConditions";
import NeedHelp from "./Components/Information/NeedHelp/NeedHelp";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  faQuestionCircle,
  faPhoneAlt,
  faEnvelope,
  faStore,
  faSearch,
  faCartPlus,
  faTh,
  faBaby,
  faTshirt,
  faLaptop,
  faHamburger,
  faAppleAlt,
  faHome,
  faSprayCan,
  faPaperclip,
  faCarrot,
  faCarAlt,
  faShoppingCart,
  faCoins,
  faGlobe,
  faCheckCircle,
  faMapMarkerAlt,
  faPhoneSquareAlt,
  faTimesCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faQuestionCircle,
  faPhoneAlt,
  faEnvelope,
  faStore,
  faSearch,
  faCartPlus,
  faTh,
  faBaby,
  faTshirt,
  faLaptop,
  faHamburger,
  faAppleAlt,
  faHome,
  faSprayCan,
  faPaperclip,
  faCarrot,
  faCarAlt,
  faShoppingCart,
  faCoins,
  faGlobe,
  faCheckCircle,
  faMapMarkerAlt,
  faPhoneSquareAlt,
  faTimesCircle,
  faBars
);

const App = () => {

  //For products list
  const productsData = useSelector(state => state.products.product_list);

  const cartData = useSelector(state => state.cartlist);

  const products = productsData.map(obj => cartData.find(item => item._id === obj._id) || obj);

  //For cart order price
  const subTotalPrice = cartData.reduce((acc, cur) => acc + cur.order_quantity * cur.product_price, 0);
  const taxPrice = subTotalPrice * 0.15;
  const deliveryPrice = subTotalPrice === 0 ? 0 : subTotalPrice < 500 ? 30 : 20;
  const grandTotalPrice = subTotalPrice + taxPrice + deliveryPrice;

  //Toggle sidebar
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="App">
      <div className="Navbar">
        <TopNavBar toggle={toggle} />
        <BottomNavBar cartData={cartData} grandTotalPrice={grandTotalPrice} />
      </div>
      <Switch>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/privacypolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/termsconditions">
          <TermsAndConditions />
        </Route>
        <Route path="/needhelp">
          <NeedHelp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetpassword/:token/:id">
          <ResetPassword />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/orderhistory">
          <OrderHistory />
        </Route>
        <Route path="/">
          <Home products={products} isOpen={isOpen} />
          <Route path="/products/:id">
            <ProductDetailsModal products={products} />
          </Route>
          <Route path="/cartlist">
            <CartList
              cartData={cartData}
              subTotalPrice={subTotalPrice}
              taxPrice={taxPrice}
              deliveryPrice={deliveryPrice}
              grandTotalPrice={grandTotalPrice}
            />
          </Route>
        </Route>
      </Switch>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
};

export default AppWrapper;
