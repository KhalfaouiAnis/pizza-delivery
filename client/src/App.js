import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "aos/dist/aos.css";

import Navbar from "./components/navbar/Navbar.component";
import Homescreen from "./screens/Homescreen";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cartscreen from "./screens/Cartscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/admin/Adminscreen";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div style={{ marginTop: "4rem" }}>
          <Switch>
            <Route path="/" exact component={Homescreen} />
            <Route path="/cart" exact component={Cartscreen} />
            <Route path="/orders" exact component={Ordersscreen} />
            <Route path="/login" exact component={Loginscreen} />
            <Route path="/register" exact component={Registerscreen} />
            <Route path="/admin" component={Adminscreen} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
