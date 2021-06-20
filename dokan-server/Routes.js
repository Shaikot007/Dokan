const express = require("express");
const ProductController = require("./Controller/ProductController");
const CategoryController = require("./Controller/CategoryController");
const CountryController = require("./Controller/CountryController");
const UsersController = require("./Controller/UsersController");
const UserOrder = require("./Controller/OrderController");
const PasswordController = require("./Controller/PasswordController");

const checkTokenMiddleware = require("./Middlewares/checkToken");

const router = express.Router();

//For products
router.post("/products", ProductController.productCreateController);
router.get("/products", ProductController.productListController);
router.get("/products/:product_id", ProductController.productDetailsController);

//For products category
router.post("/categories", CategoryController.categoryCreateController);
router.get("/categories", CategoryController.categoryListController);

//For products country
router.post("/countries", CountryController.countryCreateController);
router.get("/countries", CountryController.countryListController);

//For users sign up or sign in
router.post("/signup", UsersController.usersCreateController);
router.post("/signin", UsersController.userController);

//For forget and reset password
router.post("/forgetpassword", PasswordController.forgetPasswordController);
router.patch("/resetpassword/:token/:id", PasswordController.resetPasswordController);

//For user order
router.post("/order", checkTokenMiddleware, UserOrder.orderCreateController);
router.get("/order", checkTokenMiddleware, UserOrder.orderListController);

module.exports = router;
