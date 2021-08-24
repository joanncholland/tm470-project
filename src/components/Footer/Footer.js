import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer id="footer">
      <ul>
        <li>Terms and Conditions</li>
        <li>Privacy Policy</li>
        <li>
          <Link to="/support">Contact Us</Link>
        </li>
        <li>About Us</li>
      </ul>
      <small>Copyright &copy; Joann Holland.</small>
    </footer>
  );
}
