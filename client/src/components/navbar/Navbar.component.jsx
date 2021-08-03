import "./navbar.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";

import notifBell from "../../assets/icons/icons8-notification-48.png";
import animatedNotifBell from "../../assets/icons/icons8-notification.gif";
import { useEffect, useState } from "react";

import { useHistory } from "react-router";

export default function Navbar() {
  const [notifIcon, setNotifIcon] = useState(notifBell);

  const history = useHistory();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems, loading } = cartState;
  const userState = useSelector((state) => state.userLogin);
  const { currentUser } = userState;

  useEffect(() => {
    if (loading) {
      setNotifIcon(animatedNotifBell);
    } else {
      setNotifIcon(notifBell);
    }
  }, [loading]);

  return (
    <div>
      <nav className="navbar custom-navbar-bg fixed-top navbar-expand-lg shadow-md p-3 mb-3">
        <Link
          className="logo navbar-brand"
          to="/"
          title="Fast Food Fast Delivery"
        >
          <img src={Logo} alt="FFFD" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i class="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <div className="dropdown">
                <Link
                  className="dropdown-toggle nav-link"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {currentUser.name}
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {currentUser && !currentUser.isAdmin && (
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  )}
                  {currentUser && currentUser.isAdmin && (
                    <div>
                      <Link className="dropdown-item" to="/admin">
                        Admin panel
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Stats
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Settings
                      </Link>
                    </div>
                  )}
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => {
                      dispatch(logoutUser());
                      history.push("/login");
                    }}
                  >
                    <li>Logout</li>
                  </Link>
                </div>
              </div>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                className="d-flex align-items-center nav-link"
                to="/notifications"
              >
                {/* <i class="fas fa-bell" style={{ color: "#ff4800" }}>
                  <span className="inline-space"></span>
                </i> */}
                <img className="small-icon" src={notifIcon} alt="Notif-icon" />
                <sup>
                  <span className={"badge badge-pill"}>1k</span>
                </sup>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="d-flex align-items-center nav-link" to="/cart">
                <i
                  class="fas fa-shopping-cart cart"
                  style={{ color: "#ff4800" }}
                >
                  <span className="inline-space"></span>
                </i>
                <sup>
                  <span
                    className={
                      loading ? "badge badge-pill" : "badge badge-pill"
                    }
                  >
                    {cartItems.length}
                  </span>
                </sup>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
