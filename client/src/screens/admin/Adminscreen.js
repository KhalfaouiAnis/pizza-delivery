import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

import "../../styles/adminscreen.styles.css";
import AddNewPizza from "./AddNewPizza";
import EditPizza from "./EditPizza";
import OrdersList from "./OrdersList";
import PizzaList from "./PizzaList";
import UsersList from "./UserList";

export default function Adminscreen() {
  const userState = useSelector((state) => state.userLogin);
  const { currentUser } = userState;

  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="text-center">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-left">Admin Panel</h2>
          <ul className="admin-features">
            <li>
              <Link className="admin-nav-item" to="/admin/users-list">
                Customers List
              </Link>
            </li>
            <li>
              <Link className="admin-nav-item" to="/admin/pizza-list">
                Pizza List
              </Link>
            </li>
            <li>
              <Link className="admin-nav-item" to="/admin/add-pizza">
                Add Pizza
              </Link>
            </li>
            <li>
              <Link className="admin-nav-item" to="/admin/orders-list">
                Orders List
              </Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/admin/" component={UsersList} />
            <Route exact path="/admin/users-list" component={UsersList} />
            <Route exact path="/admin/orders-list" component={OrdersList} />
            <Route exact path="/admin/pizza-list" component={PizzaList} />
            <Route exact path="/admin/add-pizza" component={AddNewPizza} />
            <Route
              exact
              path="/admin/edit-pizza/:pizzaid"
              component={EditPizza}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
