import { useEffect, useState } from "react";
import User from "../models/user";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonCircle } from "react-bootstrap-icons";


const Signup = () => {
  const [user, setUser] = useState(new User());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();

  //mounted
  useEffect(() => {
    if (currentUser?.user_id) {
      //navigate
      navigate("/profile");
    }
  }, []);

  //<input name="x" value="y" onChange=(event) => handleChange(event)>
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSubmitted(true);
    console.log(user);

    if (!user.firstName || !user.lastName || !user.password || !user.email) {
      return;
    }

    setLoading(true);

    AuthenticationService.register(user)
      .then((_) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 409) {
          setErrorMessage("Email already exists!!!");
        } else {
          setErrorMessage("Unexpected error occurred!!");
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="heading">Sign Up</h1>
      <div className="container mt-5">
        <div className="card ml-auto mr-auto p-3 shadow-lg custom-card">
          <PersonCircle className="ml-auto mr-auto user-icon" />

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form
            onSubmit={(e) => handleRegister(e)}
            noValidate
            className={submitted ? "was-validated" : ""}
          >
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={user.firstName}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">First name is required.</div>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={user.lastName}
                onChange={(e) => handleChange(e)}
                required
              />
              <div className="invalid-feedback">Last name is required.</div>
            </div>

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
              Sign Up
            </button>
          </form>

          <Link
            to="/login"
            className="btn btn-link"
            style={{ color: "darkgray" }}
          >
            I have an Account!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
