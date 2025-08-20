import React, { useState } from "react";
import { auth } from "./firebase";
import "./Login.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Setup invisible recaptcha
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired, reset and try again");
          },
        },
        auth
      );
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert("Google login successful.");
      navigate("/dashboard"); // <-- fixed here
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  // Send OTP for phone
  const handleSendOtp = async () => {
    if (!phone) {
      alert("Enter phone number with country code, e.g. +91XXXXXXXXXX");
      return;
    }
    setLoading(true);
    try {
      setupRecaptcha();
      if (!window.recaptchaVerifier) {
        alert("RecaptchaVerifier setup failed");
        setLoading(false);
        return;
      }
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent to " + phone);
    } catch (error) {
      alert("Error sending OTP: " + (error.message || error));
    }
    setLoading(false);
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please send OTP first.");
      return;
    }
    if (!otp) {
      alert("Enter OTP");
      return;
    }
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      alert("Phone verified and logged in.");
      navigate("/dashboard"); // <-- fixed here
    } catch {
      alert("Invalid OTP.");
    }
    setLoading(false);
  };

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("Email login successful.");
      navigate("/dashboard"); // <-- fixed here
    } catch (error) {
      alert("Login failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>🔐 Login</h2>

        {/* Google Login */}
        <button
          className="btn btn-google"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "🚀 Sign in with Google"}
        </button>

        <div className="divider">or</div>

        {/* Email & Password Login */}
        <form onSubmit={handleEmailLogin} className="login-form">
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login with Email"}
          </button>
        </form>

        <div className="divider">or</div>

        {/* Phone OTP Login */}
        <div className="phone-login">
          <input
            type="tel"
            placeholder="📱 +91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
          <button
            className="btn btn-secondary"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>

        <div id="recaptcha-container"></div>

        {confirmationResult && (
          <div className="otp-section">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-success"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* Register Link */}
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        {/* User Info */}
        {user && (
          <div className="user-info">
            <h4>Logged in as:</h4>
            <p>{user.displayName || user.phoneNumber || user.email}</p>
            <p className="uid">UID: {user.uid}</p>
          </div>
        )}
      </div>
    </div>
  );
}
