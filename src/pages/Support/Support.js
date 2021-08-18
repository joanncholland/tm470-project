import React from "react";

import "./Support.scss";

export default function Support() {
  return (
    <div className="container">
      <h1>Support</h1>
      <form
        name="contact"
        action="/thanks"
        method="POST"
        netlify
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name:{" "}
            <input required autoFocus={true} type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input required type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea required name="message"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
}
