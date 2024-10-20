import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

import { useDispatch } from "react-redux";
import { onSuccessfulLogin } from "../../store/userSlice";

import "./index.css";

const status = {
  initial: "INITIAL",
  loading: "FETCHING DETAILS...",
  success: "SUCCESS",
  failed: "FAILED",
};

function SignUp() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [signInStatus, setSignInStatus] = useState(status.initial);
  const [passwordState, setPasswordState] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = Cookie.get("reviva-token");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  const onSuccessfulSignIn = ({ username, token, userId, message }) => {
    Cookie.set("reviva-token", token, { expires: 1 });
    Cookie.set("reviva-username", username, { expires: 1 });
    Cookie.set("reviva-userid", userId, { expires: 1 });
    dispatch(
      onSuccessfulLogin({
        username: username,
        userId: userId,
      })
    );
    setMsg(message);
    setSignInStatus(status.success);
    navigate("/");
  };

  const toggleForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setMsg("");
    setIsLoginPage((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSignInStatus(status.loading);
    try {
      const response = await axios.post(
        "https://revivai-fullstack.onrender.com/login",
        {
          email,
          password,
        }
      );
      onSuccessfulSignIn({
        token: response.data.token,
        username: response.data.username,
        userId: response.data.id,
        message: response.data.message,
      });
      setSignInStatus(status.success);
    } catch (e) {
      console.log("Error: ", e);
      setSignInStatus(status.failed);
      setMsg(e.response.data.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignInStatus(status.loading);
    try {
      const response = await axios.post(
        "https://revivai-fullstack.onrender.com/register",
        {
          email,
          username,
          password,
        }
      );
      onSuccessfulSignIn({
        token: response.data.token,
        username: response.data.username,
        userId: response.data.id,
        message: response.data.message,
      });
    } catch (e) {
      console.log("Error: ", e);
      setSignInStatus(status.failed);
      setMsg(e.response.data.message);
    }
  };

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className="container ">
      <div className="row ">
        <div className="col-md-6 sign-up-left d-flex align-items-center justify-content-center">
          <h1 className="align-self-center mt-5 mt-md-0">
            Reviva - Track your Moments
          </h1>
        </div>
        <div
          className={`col-12 col-lg-5 p-2 p-md-5 text-center text-lg-start d-flex flex-column justify-content-center align-items-start rotate-container ${
            !isLoginPage ? "rotate-register" : "rotate-login"
          }`}
        >
          <form
            className="form-container card"
            onSubmit={isLoginPage ? handleLogin : handleSignUp}
          >
            <h2 className="mb-2">{isLoginPage ? "Login" : "Signup now"}</h2>
            <p className="text-secondary">
              {isLoginPage
                ? "Please log in to continue."
                : "Or track your existing application."}
            </p>

            <div className="input-group mb-3">
              <input
                type="email"
                placeholder="Enter Email..."
                className="form-control"
                value={email}
                autoComplete="email"
                onChange={onChangeEmail}
                required
              />
            </div>

            {!isLoginPage && (
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Enter Username..."
                  className="form-control"
                  value={username}
                  autoComplete="username"
                  onChange={onChangeUsername}
                  required
                />
              </div>
            )}

            <div className="input-group mb-3">
              <input
                type={passwordState ? "text" : "password"}
                placeholder="Enter Password..."
                className="form-control"
                value={password}
                autoComplete="current-password"
                onChange={onChangePassword}
                required
              />
            </div>

            <label className="text-secondary small">
              <input
                onChange={() => setPasswordState(!passwordState)}
                type="checkbox"
                checked={passwordState}
              />{" "}
              Show Password
            </label>

            <div>
              {msg.length > 0 ? (
                <p
                  className={
                    "m-0 text-small " +
                    (signInStatus === status.success
                      ? "text-success"
                      : "text-danger")
                  }
                >
                  *{msg}
                </p>
              ) : (
                ""
              )}
            </div>

            <button className="btn btn-warning mt-2" type="submit">
              {isLoginPage ? "Login" : "Continue"}
            </button>

            <p className="small text-secondary mt-3">
              {isLoginPage
                ? "Don’t have an account?"
                : "Already have an account?"}{" "}
              <span className="text-warning" onClick={toggleForm} role="button">
                {signInStatus === status.loading ? (
                  <Spinner color="#000" />
                ) : isLoginPage ? (
                  "Register now"
                ) : (
                  "Log in"
                )}
              </span>
            </p>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
