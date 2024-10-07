import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

function SignUp() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [passwordState, setPasswordState] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrorMsg("");
    setIsLoginPage((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      Cookie.set("reivia-token", response.data.token);
      navigate("/");
    } catch (e) {
      console.log("Error: ", e);
      setErrorMsg(e.response.data.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Registered");
  };

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className="container sign-up-bg-container">
      <div className="row">
        <div className="col-md-6 sign-up-left d-flex align-items-center justify-content-center">
          <h1 className="m-auto align-self-center">
            RevivAI - Track your memories
          </h1>
        </div>
        <div
          className={`col-12 col-lg-5 p-5 text-center text-lg-start d-flex flex-column justify-content-center align-items-start rotate-container`}
        >
          <form
            className="form-container"
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
              {errMsg.length > 0 ? <p className="down m-0">*{errMsg}</p> : ""}
            </div>

            <button className="btn btn-warning mt-2" type="submit">
              {isLoginPage ? "Login" : "Continue"}
            </button>

            <p className="small text-secondary mt-3">
              {isLoginPage
                ? "Don’t have an account?"
                : "Already have an account?"}{" "}
              <span className="text-warning" onClick={toggleForm} role="button">
                {isLoginPage ? "Register now" : "Log in"}
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
