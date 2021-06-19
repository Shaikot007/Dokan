require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./Routes");

const app = express();

app.use(morgan("combined"));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing application/json
app.use(express.json());

app.use(cors());

app.use(Routes);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Dokan app listening at http://localhost:${process.env.PORT}`);
});
