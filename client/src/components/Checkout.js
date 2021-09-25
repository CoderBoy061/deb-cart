import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "./styles/checkout.css";
import Snackbar from "@mui/material/Snackbar";
import { useHistory } from "react-router";

const Checkout = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const history = useHistory();
  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    if (name === "") {
      setAlert({
        showSnackbar: true,
        message: "Please Enter a name",
      });
    } else if (email === "") {
      setAlert({
        showSnackbar: true,
        message: "Please Enter a Email",
      });
    } else if (phone === "") {
      setAlert({
        showSnackbar: true,
        message: "Please Enter a number",
      });
    } else if (address === "") {
      setAlert({
        showSnackbar: true,
        message: "Please Enter a address",
      });
    } else {
      localStorage.setItem(
        "user_details",
        JSON.stringify({
          name,
          email,
          phone,
          address,
        })
      );
      setAlert({
        showSnackbar: true,
        message: "Thanks",
      });
      history.push("/payment")
    }
  };
  
  //       const  options = {
  //       "key": "rzp_test_Qey3iC23cu7rAo", // Enter the Key ID generated from the Dashboard
  //       "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       "currency": "INR",
  //       "name": "Acme Corp",
  //       "description": "Test Transaction",
  //       "image": "https://example.com/your_logo",
  //       "order_id": "order_DBJOWzybf0sJbb", //This is a sample Order ID. Pass the `id` obtained in the previous step
  //       "handler": function (response){
  //           alert(response.razorpay_payment_id);
  //           alert(response.razorpay_order_id);
  //           alert(response.razorpay_signature)
  //       },
  //       "prefill": {
  //           "name": "Gaurav Kumar",
  //           "email": "gaurav.kumar@example.com",
  //           "contact": "9999999999"
  //       },
  //       "notes": {
  //           "address": "Razorpay Corporate Office"
  //       },
  //       "theme": {
  //           "color": "#3399cc"
  //       }
  //   };
  //   var rzp1 = new Razorpay(options);
  //   rzp1.on('payment.failed', function (response){
  //           alert(response.error.code);
  //           alert(response.error.description);
  //           alert(response.error.source);
  //           alert(response.error.step);
  //           alert(response.error.reason);
  //           alert(response.error.metadata.order_id);
  //           alert(response.error.metadata.payment_id);
  //   });
  //   document.getElementById('rzp-button1').onclick = function(e){
  //       rzp1.open();
  //       e.preventDefault();
  //   }

  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "5vh" }}>
        Enter Your Personal Details
      </h3>
      <div className="user_from">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your phone number</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => submitData(e)}>
            Proceed to Checkout
          </Button>
        </Form>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          autoHideDuration={3000}
          open={alert.showSnackbar}
          onClose={closeSnack}
          message={alert.message}
        />
      </div>
    </>
  );
};

export default Checkout;
