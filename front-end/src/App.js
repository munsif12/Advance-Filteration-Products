import AllProducts from "./Screens/Homepage/AllProducts";
import "./App.css";
import backgroundImg from "./bgImg.png";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./Screens/ProductDetail/ProductDetail";
function App() {
  return (
    <div
      className="App"
      style={{ background: `Url(${backgroundImg})`, backgroundSize: "cover" }}
    >
      <Switch>
        <Route exact path="/" component={AllProducts} />
        <Route path="/product/:id" component={ProductDetail} />
      </Switch>
    </div>
  );
}

export default App;
