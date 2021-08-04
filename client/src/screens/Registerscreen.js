import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/error/Error.component";
import Success from "../components/success/Success.component";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import AOS from "aos";

export default function Registerscreen() {
  AOS.init();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [registerError, setError] = useState(null);

  const userState = useSelector((state) => state.userRegister);
  const { error, loading, success } = userState;

  const dispatch = useDispatch();

  function handleRegister() {
    if (password !== cPassword) {
      setError("Passwords do not match 🤐");
    } else {
      dispatch(
        registerUser({
          name,
          email,
          password,
        })
      );
    }
  }

  return (
    <div className="register" data-aos="zoom-in">
      <div className="row justify-content-center">
        <div className="col-md-3 mt-5 p-3 mb-5 text-center bg-white rounded shadow-lg">
          <h4 className="mt-5">Sign Up</h4>
          {error && <Error error={error} />}
          {registerError && <Error error={registerError} />}
          {success && <Success success="Your account is Created 🥳" />}
          <div>
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
            <input
              className="form-control"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
            <input
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <input
              value={cPassword}
              required
              onChange={(e) => {
                setCPassword(e.target.value);
                setError(null);
              }}
              className="form-control"
              type="password"
              placeholder="Confirm password"
            />
            <button
              disabled={loading}
              className={`shake-btn btn btn-block mt-3 mb-3 ${
                loading && "bloqued"
              }`}
              onClick={handleRegister}
            >
              Register
            </button>
            <div className="mb-3">
              <Link className="auth-link" to="/login">
                Already have an account !
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
