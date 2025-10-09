"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Login.css";
import "../App.css"
import Header from "../components/HeaderComp/Header";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isLogin) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          setAlertMessage("Login successful!");
          setShowAlert(true);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setAlertMessage(data.message || "Login failed");
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage("Network error");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        setAlertMessage("Passwords don't match");
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setAlertMessage("User registered successfully!");
          setShowAlert(true);
          setTimeout(() => {
            setIsLogin(true);
            setShowAlert(false);
          }, 2000);
        } else {
          setAlertMessage(data.error || "Registration failed");
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage("Network error");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (
    <>
      <div className="login-container">
        <Header />

        {showAlert && (
          <div className="alert-container">
            <div className="alert-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="alert-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 
             0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{alertMessage}</span>
              <button
                onClick={() => setShowAlert(false)}
                className="alert-close"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="login-body">
          <div className="login-sign-up-container">
            <div className="login-tabs">
              <button
                className={isLogin ? "active" : ""}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? "active" : ""}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <div className="login-form-content">
              <div className={`form-fade${isLogin ? " active" : ""}`}>
                {isLogin && (
                  <div className="login-form-container">
                    {/* Login Form */}
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                      <input 
                        name="email" 
                        placeholder="Email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p className="forgot-password">Forgot Your Password?</p>
                      {isLoading ? (
                        <div className="loader"></div>
                      ) : (
                        <button className="login-btn">
                          <span>Login</span>
                          <span></span>
                        </button>
                      )}
                    </form>
                  </div>
                )}
              </div>
              <div className={`form-fade${!isLogin ? " active" : ""}`}>
                {!isLogin && (
                  <div className="signup-form-container">
                    {/* Sign Up Form */}
                    <div className="login-form-container">
                      <form action="" className="login-form" onSubmit={handleSubmit}>
                        <input 
                          type="text" 
                          placeholder="Name & Surname" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input 
                          name="email" 
                          placeholder="Email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          name="password"
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                          name="retype-password"
                          placeholder="Retype Password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {isLoading ? (
                          <div className="loader"></div>
                        ) : (
                          <button className="login-btn">
                            <span>Sign Up</span>
                            <span></span>
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;