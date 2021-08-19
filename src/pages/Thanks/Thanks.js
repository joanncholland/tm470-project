import React from "react";

import success from "../../assets/images/success.svg";

import "./Thanks.scss";

export default function Thanks() {
  return (
    <div className="container thanks">
      <h1>Message sent!</h1>
      <p>
        Thank you for your message. You'll get a response as soon as possible.
      </p>
      <img id="message-sent" src={success} alt="Message sent" />
    </div>
  );
}
