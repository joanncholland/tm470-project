import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";
import GardenLocation from "../../components/GardenLocation/GardenLocation";

import "./GardenPlanner.scss";

export default function Planner() {
  const locationRef = useRef();
  const { addLocation, allLocations, cropLocationData } = useGardenPlanner();

  useEffect(() => {}, [cropLocationData]);

  return (
    <div className="container">
      <div className="garden-planner">
        <h1>Garden Planner</h1>
        <form onSubmit={() => addLocation(locationRef.current.value)}>
          <div className="input-field">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="loation"
              placeholder="Enter location name"
              required
              ref={locationRef}
              autoFocus={true}
            />
          </div>
          <button type="submit">Add Location</button>
        </form>
        <div className="locations">
          <h2>Locations</h2>
          {allLocations &&
            allLocations.map((item) => {
              return (
                <GardenLocation
                  key={item.location}
                  id={item.id}
                  location={item.location}
                  crops={item.crops}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
