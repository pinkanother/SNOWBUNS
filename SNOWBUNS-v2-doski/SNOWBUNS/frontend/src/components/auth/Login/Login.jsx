import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hasEmailValue, setHasEmailValue] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        setHasEmailValue(e.target.value !== "");
        break;
      case "password":
        setPassword(e.target.value);
        setHasPasswordValue(e.target.value !== "");
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    dispatch(login(email, password, navigate));
    // toast.success("Login Successfully");
  };

  return (
    <section className="login">
      <div className="login-box">
        <div>
          <h2>Login</h2>
          <div className="login-input-box">
            <span className="icon">
              <i className="fa fa-envelope" />
            </span>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={handleInputChange}
            />
            <label className={hasEmailValue ? "float" : ""}>Email</label>
          </div>
          <div className="login-input-box">
            <span className="icon">
              <i className="fa fa-lock" style={{ cursor: "pointer" }} />
            </span>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={handleInputChange}
            />
            <label className={hasPasswordValue ? "float" : ""}>Password</label>
          </div>
          <button className="login-button" onClick={onSubmit}>
            Login <i class="fa fa-sign-in"></i>
          </button>
          <div className="login-link">
            <Link to="/forgot-password">Forgot Password</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className="login-ds-divider" style={{ margin: "16px 0px" }}>
            <div className="login-ds-divider__left"></div>
            <div className="login-ds-divider__content">OR</div>
            <div className="login-ds-divider__right"></div>
          </div>
          <div className="login-ds-button">
            <div className="login-ds-button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                style={{ width: "16px", height: "16px" }}
              >
                <path
                  fill="#4285f4"
                  fill-opacity="1"
                  fill-rule="evenodd"
                  stroke="none"
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                ></path>
                <path
                  fill="#34a853"
                  fill-opacity="1"
                  fill-rule="evenodd"
                  stroke="none"
                  d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                ></path>
                <path
                  fill="#fbbc05"
                  fill-opacity="1"
                  fill-rule="evenodd"
                  stroke="none"
                  d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                ></path>
                <path
                  fill="#ea4335"
                  fill-opacity="1"
                  fill-rule="evenodd"
                  stroke="none"
                  d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                ></path>
              </svg>
            </div>
            <p style={{ color: "white" }}>Log in with Google</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
