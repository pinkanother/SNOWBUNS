import React, { useState } from "react";
import { register } from "../../../actions/authAction";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hasEmailValue, setHasEmailValue] = useState(false);
  const [hasChannelName, setHasChannelName] = useState(false);
  const [hasAboutChannel, setHasAboutChannel] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);
  const [hasCfPasswordValue, setHasCfPasswordValue] = useState(false);
  const [email, setEmail] = useState("");
  const [channelName, setChannelName] = useState("");
  const [aboutChannel, setAboutChannel] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "email":
        setHasEmailValue(e.target.value !== "");
        setEmail(e.target.value);
        break;
      case "channelName":
        setHasChannelName(e.target.value !== "");
        setChannelName(e.target.value);
        break;
      case "aboutChannel":
        setHasAboutChannel(e.target.value !== "");
        setAboutChannel(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        setHasPasswordValue(e.target.value !== "");
        break;
      case "confirmPassword":
        setHasCfPasswordValue(e.target.value !== "");
        setCfPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    console.log({email, channelName, aboutChannel, password, cfPassword});
    dispatch(register(email, channelName, aboutChannel, password, cfPassword, navigate));
  };

  return (
    <section className="register">
      <div className="register-box">
        <div>
          <h2>Register</h2>
          <div className="register-input-box">
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
          <div className="register-input-box">
            <span className="icon">
              <i className="fa fa-video-camera" />
            </span>
            <input
              type="text"
              id="channelName"
              required
              value={channelName}
              onChange={handleInputChange}
            />
            <label className={hasChannelName ? "float" : ""}>ChannelName</label>
          </div>
          <div className="register-input-box">
            <span className="icon">
              <i className="fa fa-book" />
            </span>
            <input
              type="text"
              id="aboutChannel"
              required
              value={aboutChannel}
              onChange={handleInputChange}
            />
            <label className={hasAboutChannel ? "float" : ""}>Channel Description</label>
          </div>
          <div className="register-input-box">
            <span className="icon">
              <i
                className={`fa fa-${showPassword ? "eye" : "lock"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(1 - showPassword)}
              />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={handleInputChange}
            />
            <label className={hasPasswordValue ? "float" : ""}>Password</label>
          </div>
          <div className="register-input-box">
            <span className="icon">
              <i
                className={`fa fa-${showCfPassword ? "eye" : "lock"}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowCfPassword(1 - showCfPassword);
                }}
              />
            </span>
            <input
              type={showCfPassword ? "text" : "password"}
              id="confirmPassword"
              required
              value={cfPassword}
              onChange={handleInputChange}
            />
            <label className={hasCfPasswordValue ? "float" : ""}>
              Confirm Password
            </label>
          </div>
          <button className="register-button" onClick={onSubmit}>
            Register <i className="fa fa-user"></i>
          </button>
          <div className="register-link">
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
