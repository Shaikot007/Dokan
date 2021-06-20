import React, { useEffect } from "react";
import "./Home.css";
import { fetchProductsAction } from "../../Redux/Action/ProductAction";
import { fetchCategoriesAction } from "../../Redux/Action/CategoryAction";
import { fetchCountriesAction } from "../../Redux/Action/CountryAction";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import ProductsCarousel from "../Carousel/ProductsCarousel";
import ProductList from "../ProductList/ProductList";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import { Collapse } from "reactstrap";

const Home = (props) => {

  const { products, isOpen } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchCategoriesAction());
    dispatch(fetchCountriesAction());
  }, [dispatch]);

  const categoryName = useSelector(state => state.products.product_filters.product_category);

  return (
    <div className="Home">
      <div className="Main">
        <Collapse isOpen={isOpen} className="NavbarLeft">
          <Sidebar />
        </Collapse>
        <div className="ProductArea">
          <ProductsCarousel />
          <div className="CategoryName">
            <h3>{categoryName === "" ? "Our products" : categoryName}</h3>
          </div>
          <ProductList products={products} />
          <div className="Pagination">
            <Pagination />
          </div>
        </div>
      </div>
      <div className="FooterArea">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
