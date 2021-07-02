import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/UserAuthContext";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match.");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      {error && <p>{error}</p>}

      <h2>Information</h2>
      <p>Email: {currentUser.email}</p>
      <p>UID: {currentUser.uid}</p>
      <button onClick={handleLogout}>Log Out</button>

      <h2>Change Login Details</h2>
      <p>Please enter your new details.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
        </div>

        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Leave blank to keep the same"
          />
        </div>

        <button disabled={loading} type="submit">
          Update
        </button>

        <p>
          <Link to="/dashboard">Cancel</Link>
        </p>
      </form>
    </div>
  );
}
