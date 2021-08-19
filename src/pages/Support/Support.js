import React from "react";
import { useHistory } from "react-router-dom";

import "./Support.scss";

export default function Support() {
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    history.pushState("/thanks");
  };
  return (
    <div className="container">
      <h1>Support</h1>
      <form
        onSubmit={onSubmit}
        name="contact"
        data-netlify="true"
        method="post"
        action="/thanks/"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message" />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  );
}
