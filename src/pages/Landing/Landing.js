import React from "react";

import gardeningIllustration from "../../assets/images/gardeningIllustration.png";
import tasklist from "../../assets/images/tasklist.png";
import gardenplanner from "../../assets/images/gardenplanner.png";
import cropindex from "../../assets/images/cropindex.png";

import "./Landing.scss";

export default function Landing() {
  return (
    <div className="container">
      <div className="landing-header">
        <div className="landing-intro">
          <h1>Looking to keep track of your fruits and veggies?</h1>
          <p>
            MyGarden is a simple application that helps you plan your garden.
          </p>
          <button>Register now</button>
        </div>
        <div className="landing-illustration">
          <img src={gardeningIllustration} alt="MyGarden Illustration" />
        </div>
      </div>

      <div className="landing-features">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <img src={tasklist} alt="Task list" />
            <h3>Task List</h3>
            <p>
              Monitor your gardening tasks with a simple list. You'll never
              forget when to feed your tomatoes again!
            </p>
          </div>
          <div className="feature">
            <img src={gardenplanner} alt="Garden planner" />
            <h3>Garden Planner</h3>
            <p>
              Record which crops are growing in which part of your garden.
              Greenhouse or veg patch?
            </p>
          </div>
          <div className="feature">
            <img src={cropindex} alt="Crop index" />
            <h3>Crop Index</h3>
            <p>
              Discover handy information about each crop. Give your fruits and
              veggies the care they need.
            </p>
          </div>
        </div>
      </div>

      <div className="landing-register">
        <h1>Register your free account today</h1>
        <p>Never feel overwhelmed with gardening again.</p>
        <button>Register now</button>
      </div>
    </div>
  );
}
