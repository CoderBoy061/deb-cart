const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");
// const uniqid = require("uniqid");
const { product } = require("./product");
// // const product = require("./product");
// console.log(product.price);

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.get("/", (req, res) => {
  res.send("hello from server");
});
app.get("/product", (req, res) => {
  res.status(200).json(product);
});
app.post("/createorder", (req, res) => {
  const amount = product.price;
  const currency = "INR";
  const receipt = "#edugwsjgsdjgsfdg";
  const notes = {
    title: product.title,
  };
  instance.orders.create(
    { amount, currency, receipt, notes },
    (error, order) => {
      if (!error) {
        return res.status(200).json(order);
      }
      return res.status(500).json(error.message);
    }
  );
});

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
