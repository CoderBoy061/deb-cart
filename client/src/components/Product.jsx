import React, { useEffect, useState } from "react";
import "./styles/product.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import { Spin } from "antd";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://online-debcart.herokuapp.com/product", {
        Accept: "application/json",
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loading) {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          width:"100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Loading...."></Spin>
      </div>
    );
  }
  return (
    <div className="product">
      <div className="product_info">
        <p className="title">{product.title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>{product.price}</strong>
        </p>
      </div>

      <img src={product.image} alt="" />
      <NavLink
        to="checkout"
        className="buy_btn"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "1.2rem",
          textAlign: "center",
        }}
      >
        Buy Now
      </NavLink>
    </div>
  );
};

export default Product;
