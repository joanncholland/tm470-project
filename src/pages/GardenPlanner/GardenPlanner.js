import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";

import "./GardenPlanner.scss";

export default function Planner() {
  const { plantsInPlanner, retrievePlantsInPlanner } = useGardenPlanner();

  async function loadPlants() {
    try {
      // let plantsInPlanner = Object.entries(plantsInPlanner)
      //   await retrievePlantsInPlanner();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadPlants();
    console.log(plantsInPlanner);
  }, []);

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
        {!plantsInPlanner && (
          <div>
            <p>No plants here...</p>
            <button>
              <Link to="/crop-index">Go to Crop Index</Link>
            </button>
          </div>
        )}
        {plantsInPlanner &&
          plantsInPlanner.map((item) => {
            {
              /* return <p>{item}</p>; */
            }
            console.log(item[0]);
          })}
        {/* {plantsInPlanner && plantsInPlanner.map((item) => console.log(item))} */}
      </div>
    </div>
  );
}
