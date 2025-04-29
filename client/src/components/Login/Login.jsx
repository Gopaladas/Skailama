import React, { useReducer, useState } from "react";
import "./login.css";
import bend from "../../assets/bend.png";
import circle from "../../assets/circle.png";
import google from "../../assets/google.png";
import axios from "axios";
import { authApi } from "../../mainApi";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isLoggedIn, isLoading } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(`${authApi}/login`, formData, {
        withCredentials: true,
      });

      console.log(res.data.data);
      if (res?.data?.success) {
        dispatch(setLogin(res?.data?.data));
        navigate("/home");
      } else {
      }
    } catch (error) {
      console.log("error::", error.message);
    }
  };
  return (
    <div className="main-section">
      <div className="left-section">
        <div className="left-top-section">
          <div>
            <div className="img-section">
              <div>
                <img src={circle} className="img" alt="circle icon" />
                <img src={bend} className="img1" alt="Bend icon" />
              </div>
              <div className="text-section">
                <p className="act-text">
                  <span className="sub-text">Ques.</span>AI
                </p>
              </div>
            </div>
          </div>

          <div className="left-text-section">
            <div className="sub-div-text">Your podcast </div>
            <div className="sub-div-text">will no longer</div>
            <div className="sub-div-text">be just a hobby.</div>
          </div>

          <div className="left-sub-text-section">
            <div className="left-sub-text-sub">
              Supercharge Your Distribution{" "}
            </div>
            <div className="left-sub-text-sub">using our AI assistant!</div>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="right-top-section">
          <div className="img-right-section">
            <div>
              <img src={circle} className="right-img" alt="Circle icon" />
              <img src={bend} className="right-img1" alt="Bend icon" />
            </div>
            <div className="text-right-section">
              <p className="right-act-text">
                <span>Welcome to</span>
                <span className="right-sub-text">
                  <span>Ques.</span>AI
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="right-form-section">
          <form className="right-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="Email Address"
                className="emailinput"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="passwordinput"
                placeholder="Password"
              />
            </div>

            <div className="sub-form">
              <div>
                <label className="remember-me-label">
                  <input
                    type="checkbox"
                    className="remember-me-checkbox"
                    checked={formData.remember}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        remember: e.target.checked,
                      }))
                    }
                  />
                  <span className="remember-me-text">Remember me</span>
                </label>
              </div>
              <div>
                <a href="#">forgot password?</a>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        <div className="divide">
          <div className="line"></div>
          <div>
            <span>or</span>
          </div>
          <div className="line"></div>
        </div>

        <div className="g-section">
          <button className="g-button">
            <img src={google} className="g-img" />
            continue with google
          </button>
        </div>

        <div className="register-section">
          <p>
            Don't have an account <a href="/register">createaccount</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
