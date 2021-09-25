import React from "react";
import Product from "./Product";
import "./styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home_row">
        <Product />
      </div>
    </div>
  );
};

export default Home;
