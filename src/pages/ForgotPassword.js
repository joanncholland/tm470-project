import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }

    setLoading(false);
  }

  return (
    <>
      <h1>Password Reset</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <p>Please enter your details.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={emailRef} required />

        <button disabled={loading} type="submit">
          Reset Password
        </button>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          Don't have an account yet?
          <Link to="/register">Register</Link>
        </p>
      </form>
    </>
  );
}
