import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import User from "../models/user";
import AuthenticationService from "../services/authentication.service";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/actions/user";

import { getUserRole } from "../services/base.service";
import { Role } from "../models/role";

import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [user, setUser] = useState(new User("", ""));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.user_id) {
      console.log(currentUser.gender);
      //navigate
      navigate("/profile");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setSubmitted(true);

    console.log(user);

    if (!user.email || !user.password) {
      return;
    }

    setLoading(true);

    AuthenticationService.login(user)
      .then((response) => {
        console.log("login success" + response.data);
        dispatch(setCurrentUser(response.data));

        if (getUserRole() === Role.USER) navigate("/profile");
        else navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("email or password is not valid ");
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="heading">Login</h1>
      <div className="container mt-5">
        <div className="card ml-auto mr-auto p-3 shadow-lg custom-card">

          <PersonCircle className="ml-auto mr-auto user-icon" />

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form
            onSubmit={(e) => handleLogin(e)}
            noValidate
            className={submitted ? "was-validated" : ""}
          >
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">Email is required.</div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">Password is required.</div>
            </div>

            <button className="btn btn-info w-100 mt-3" disabled={loading}>
              Sign In
            </button>
          </form>

          <Link
            to="/signup"
            className="btn btn-link"
            style={{ color: "darkgray" }}
          >
            Create New Account!
          </Link>
        </div>
      </div>

    </div>);
};

export default Login;