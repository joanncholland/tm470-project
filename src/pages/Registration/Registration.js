import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/UserAuthContext";

import "./Registration.scss";
import gardeningIllustration from "../../assets/images/gardeningIllustration.png";

export default function Registration() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      history.push("/userdetails");
    } catch {
      setError("Failed to create an account.");
    }

    setLoading(false);
  }

  return (
    <div className="row">
      <div className="form">
        <div className="form-top">
          <h1>Create an account</h1>
          <p>Please enter your details.</p>
          {error && <p>{error}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email address"
              required
              autoFocus={true}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              ref={confirmPasswordRef}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button disabled={loading} type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>

      <div className="illustration">
        <img src={gardeningIllustration} alt="Gardening illustration" />
      </div>
    </div>
  );
}
