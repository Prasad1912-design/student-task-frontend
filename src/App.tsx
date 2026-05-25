import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./controllers/Login";
import Register from "./controllers/Register";
import Dashboard from "./controllers/Dashboard";
import UpdateStudent from "./controllers/UpdateStudent";

function App() {

  const getAuth = () => {
    return localStorage.getItem("logSuccess") === "true";
  };

  const [isAuth, setIsAuth] = useState(getAuth());

  useEffect(() => {
    setIsAuth(getAuth());
  }, []);

  // LOGIN SUCCESS
  const logSuccess = (email,userID) => {
    localStorage.setItem("userId", userID);
    localStorage.setItem('userEmail',email);
    localStorage.setItem("logSuccess", "true");
    setIsAuth(true);
  };

  // LOGOUT
  const logFail = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("logSuccess");
    setIsAuth(false);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login logSuccess={logSuccess} />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/newRegistration"
          element={
            isAuth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register />
            )
          }
        />

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Dashboard logFail={logFail} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/updateStudent/:id" element={
          isAuth ? (<UpdateStudent />) : (
            <Navigate to = "/" />
          )
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;