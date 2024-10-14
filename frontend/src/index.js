import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Stats from "./components/Stats";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
