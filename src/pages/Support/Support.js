import React from "react";
import { useHistory } from "react-router-dom";

import pdficon from "../../assets/images/pdficon.png";

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
      <div className="contact-form">
        <h2>Get in touch</h2>
        <p>Please enter your query below and you'll get a response soon!</p>
        <form
          onSubmit={onSubmit}
          name="contact"
          data-netlify="true"
          method="post"
          action="/thanks/"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="input-field">
            <label htmlFor="name">First name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your first name"
              autoFocus="true"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Enter your message"
              required
              cols="33"
              rows="5"
            />
          </div>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
      <div className="instructions">
        <h2>Application Instructions</h2>
        <p>
          Need a little help getting started? Click on the PDF icon below to
          view the free mini instruction booklet and follow a few simple steps.
        </p>
        <img src={pdficon} alt="PDF icon" />
      </div>
    </div>
  );
}
