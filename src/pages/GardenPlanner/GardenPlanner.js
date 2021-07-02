import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useGardenPlanner } from "../../contexts/GardenPlannerContext";

import "./GardenPlanner.scss";

export default function Planner() {
  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="garden-planner">
        <h1>Garden Planner</h1>
        <form>
          <div className="input-field">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="loation"
              placeholder="Enter location name"
            />
          </div>
          <button type="submit">Add Location</button>
        </form>
      </div>
    </div>
  );
}
