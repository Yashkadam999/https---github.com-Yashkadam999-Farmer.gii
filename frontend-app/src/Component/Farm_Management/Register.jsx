import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Farm_Management/firebase";
import './Login.css';

function Login() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Authenticated:", user.uid, user.email || user.phoneNumber);
      } else {
        console.log("⚠️ No user signed in");
      }
    });
    return () => unsubscribe();
  }, []);

  // Create reCAPTCHA verifier only once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible', // Can be 'normal' to show visible captcha
          callback: () => console.log("✅ reCAPTCHA solved")
        },
        auth
      );
    }
    return window.recaptchaVerifier;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handlePostLogin(userCredential.user);
    } catch (error) {
      console.error("🔥 Login error:", error.code, error.message);
      alert(`❌ Login failed: ${error.code}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handlePostLogin(result.user);
    } catch (error) {
      console.error("🔥 Google login error:", error.code, error.message);
      alert(`❌ Google login failed: ${error.code}`);
    }
  };

  const sendOtp = async () => {
    if (!phoneNumber) return alert("Enter a phone number");

    let formattedNumber = phoneNumber.trim();
    if (!formattedNumber.startsWith('+')) {
      formattedNumber = '+91' + formattedNumber; // Default to India
    }

    if (!/^\+[1-9]\d{6,15}$/.test(formattedNumber)) {
      return alert("❌ Invalid phone number format. Example: +911234567890");
    }

    try {
      const recaptcha = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, formattedNumber, recaptcha);
      setConfirmationResult(result);
      alert("📲 OTP sent to your phone!");
    } catch (error) {
      console.error("🔥 OTP send error:", error.code, error.message);
      alert(`❌ Failed to send OTP: ${error.code}`);
    }
  };

  const verifyOtp = async () => {
    if (!otp || !confirmationResult) return alert("Enter OTP first");
    try {
      const result = await confirmationResult.confirm(otp);
      await handlePostLogin(result.user);
    } catch (error) {
      console.error("🔥 OTP verify error:", error.code, error.message);
      alert("❌ Invalid OTP");
    }
  };

  const handlePostLogin = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        email: user.email || null,
        phone: user.phoneNumber || null,
        role: role,
        name: user.displayName || "Unnamed User"
      });
    }

    const userData = (await getDoc(userDocRef)).data();
    if (userData.role === role) {
      navigate(role === 'farmer' ? '/farmer-dashboard' : '/dashboard');
    } else {
      alert("❌ Role mismatch! Please select the correct role.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>🔐 Login</h2>

        {/* Email/Password Login */}
        <form onSubmit={handleLogin} className="login-form">
          <label>👤 Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="farmer">Farmer</option>
            </select>
          </label>

          <label>📧 Email:
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>🔑 Password:
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <button type="submit" className="btn-primary">Login with Email</button>
        </form>

        <div className="divider">or</div>

        {/* Google Login */}
        <button onClick={handleGoogleLogin} className="btn-google">🚀 Sign in with Google</button>

        {/* Phone OTP Login */}
        <div className="phone-login">
          <input type="text" placeholder="Enter phone e.g. +911234567890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button onClick={sendOtp} className="btn-secondary">📲 Send OTP</button>
          <div id="recaptcha-container"></div>
        </div>

        <div className="otp-section">
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp} className="btn-success">✅ Verify OTP</button>
        </div>

        <p className="register-link">Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
