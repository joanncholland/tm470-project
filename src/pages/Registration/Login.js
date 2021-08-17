import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/UserAuthContext";

import "./Registration.scss";
import gardeningIllustration from "../../assets/images/gardeningIllustration.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // if there is no error, set the error to an empty string
      setError("");
      // set the loading state
      setLoading(true);
      // log the user in to their account
      await login(emailRef.current.value, passwordRef.current.value);
      // send the user to their dashboard page
      history.push("/dashboard");
    } catch {
      setError("Failed to sign in.");
    }
    setLoading(false);
  }

  return (
    <div className="row">
      <div className="form">
        <div className="form-top">
          <h1>Welcome back!</h1>
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
            <p>
              <Link to="/forgot-password">Forgot password? </Link>
            </p>
          </div>

          <button disabled={loading} type="submit">
            Login
          </button>
          <p>
            Don't have an account yet?
            <Link to="/register"> Register here</Link>
          </p>
        </form>
      </div>

      <div className="illustration">
        <img src={gardeningIllustration} alt="Gardening illustration" />
      </div>
    </div>
  );
}
