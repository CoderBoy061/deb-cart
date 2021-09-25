import React, { useEffect, useState } from "react";
import "./styles/admin.css";
import "antd/dist/antd.css";
import { Spin } from "antd";
import axios from "axios";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [payid, setPayid] = useState("");
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://online-debcart.herokuapp.com/product", {
        Accept: "application/json",
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setProduct(res.data);
        setUser(JSON.parse(localStorage.getItem("user_details")));
        setOrderId(JSON.parse(localStorage.getItem("orderid")));
        setPayid(JSON.parse(localStorage.getItem("paymentId")));
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ececec",
        }}
      >
        <Spin tip="Loading...."></Spin>
      </div>
    );
  }
  return (
    <>
      <h3 style={{ fontFamily: "cursive" ,textAlign:"center",marginTop:"5vh"}}>Welcome to Admin Panel</h3>
      <div className="admin_panel">
        <div className="admin_product">
          <img src={product.image} alt="" />
          <div className="order_details">
            <p className="title">
              <strong style={{color:"black"}}>{product.title}</strong>
            </p>
            <p className="price">
              Price: <strong style={{color:"black"}}>{product.price}</strong>
            </p>
            <p className="order_id">
              Order Id :<strong style={{color:"black"}}>{orderId}</strong>
            </p>
            <p className="payment_id">
              Payment Id :<strong style={{color:"black"}}>{payid}</strong>
            </p>
          </div>
        </div>
        <div className="user">
          <p className="user_name">
            Order By : <strong style={{color:"black"}}>{user.name}</strong>
          </p>
          <p className="user_email">
            Email : <strong style={{color:"black"}}>{user.email}</strong>
          </p>
          <p className="user_phone">
            Phone : <strong style={{color:"black"}}>{user.phone}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default Admin;
