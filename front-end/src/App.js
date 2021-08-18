import AllProducts from "./Screens/Homepage/AllProducts";
import "./App.css";
import backgroundImg from "./bgImg.png";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./Screens/ProductDetail/ProductDetail";
import WishlistedProducts from "./Screens/Wislist-Products/WishlistedProducts";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./Screens/Cart/Cart";
function App() {
  return (
    <div
      className="App"
      style={{ background: `Url(${backgroundImg})`, backgroundSize: "cover" }}
    >
      <Navbar />
      <Switch>
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route
          exact
          path="/products/wishlisted"
          component={WishlistedProducts}
        />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
