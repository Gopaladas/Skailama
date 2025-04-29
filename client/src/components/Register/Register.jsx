import React, { useState } from "react";
import "../Login/login.css";
import bend from "../../assets/bend.png";
import circle from "../../assets/circle.png";
import google from "../../assets/google.png";
import axios from "axios";
import { authApi } from "../../mainApi";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isLoggedIn, isLoading } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${authApi}/register`, formData, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setLogin(res?.data?.data));
        navigate("/home");
      }
    } catch (error) {
      console.log("error::", error.message);
    }
  };

  return (
    <div className="register-main-section">
      <div className="register-left-section">
        <div className="register-left-top-section">
          <div>
            <div className="register-img-section">
              <div>
                <img src={circle} className="register-img" alt="circle icon" />
                <img src={bend} className="register-img1" alt="Bend icon" />
              </div>
              <div className="register-text-section">
                <p className="register-act-text">
                  <span className="register-sub-text">Ques.</span>AI
                </p>
              </div>
            </div>
          </div>

          <div className="register-left-text-section">
            <div className="register-sub-div-text">Your podcast</div>
            <div className="register-sub-div-text">will no longer</div>
            <div className="register-sub-div-text">be just a hobby.</div>
          </div>

          <div className="register-left-sub-text-section">
            <div className="register-left-sub-text-sub">
              Supercharge Your Distribution
            </div>
            <div className="register-left-sub-text-sub">
              using our AI assistant!
            </div>
          </div>
        </div>
      </div>

      <div className="register-right-section">
        <div className="register-right-top-section">
          <div className="register-img-right-section">
            <div>
              <img
                src={circle}
                className="register-right-img"
                alt="Circle icon"
              />
              <img src={bend} className="register-right-img1" alt="Bend icon" />
            </div>
            <div className="register-text-right-section">
              <p className="register-right-act-text">
                <span>Welcome to</span>
                <span className="register-right-sub-text">
                  <span>Ques.</span>AI
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="register-right-form-section">
          <form className="register-right-form" onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label htmlFor="name">User Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="register-input"
                placeholder="UserName"
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="register-input"
                placeholder="Email Address"
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="register-input"
                placeholder="Password"
              />
            </div>

            <div className="register-sub-form">
              <div>
                <label className="register-remember-me-label">
                  <input
                    type="checkbox"
                    className="register-remember-me-checkbox"
                    checked={formData.remember}
                    onChange={(e) =>
                      setFormData({ ...formData, remember: e.target.checked })
                    }
                  />
                  <span className="register-remember-me-text">Remember me</span>
                </label>
              </div>
              <div>
                <a href="#" className="register-link">
                  forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="register-login-button">
              Register
            </button>
          </form>
        </div>

        <div className="register-divide">
          <div className="register-line"></div>
          <div>
            <span>or</span>
          </div>
          <div className="register-line"></div>
        </div>

        <div className="register-g-section">
          <button className="register-g-button">
            <img src={google} className="register-g-img" alt="Google logo" />
            continue with google
          </button>
        </div>

        <div className="register-bottom-section">
          <p>
            Already Registered{" "}
            <a href="/" className="register-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
