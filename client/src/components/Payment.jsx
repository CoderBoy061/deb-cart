import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./styles/payment.css";
import "antd/dist/antd.css";
import { Spin } from "antd";

const Payment = () => {
  const [user, setUser] = useState({});
  const [loading,setLoading]=useState(false);
  const [ setPayment] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_details")));
    console.log(user);
  },[]);
  const makePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post("https://online-debcart.herokuapp.com/createorder");
    console.log(res.data);
    if (res.status !== 200) {
      return;
    }
    setLoading(false)
    const options = {
      key: "rzp_test_Qey3iC23cu7rAo",
      amount: res.data.amount,
      currency: res.data.currency,
      name: "DebCart",
      description: res.data.notes.title,
      image: res.data.notes.image,
      order_id: res.data.id,
      handler: function (response) {
        localStorage.setItem("orderid",JSON.stringify(response.razorpay_order_id));
        localStorage.setItem("paymentId",JSON.stringify(response.razorpay_payment_id));
        setPayment(true);
        history.push("/admin");
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };
  console.log(user.name);
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
    <div className="payment">
      <p className="name">
        Name: <strong>{user.name}</strong>
      </p>
      <p className="email">
        Email : <strong>{user.email}</strong>
      </p>
      <p className="phone">
        Phone: <strong>{user.phone}</strong>
      </p>
      <Button
        variant="contained"
        onClick={(e) => makePayment(e)}
        style={{ marginTop: "1vh" }}
      >
        Make payment
      </Button>
    </div>
  );
};

export default Payment;
