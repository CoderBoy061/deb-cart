import "./App.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Admin from "./components/Admin";
function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/checkout">
        <Checkout />
      </Route>
      <Route exact path="/payment">
        <Payment />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
    </div>
  );
}

export default App;
