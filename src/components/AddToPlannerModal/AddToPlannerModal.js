import React from "react";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";

import "./AddToPlannerModal.scss";

export default function AddToPlannerModal() {
  const {
    allLocations,
    setChoosingLocation,
    choosingLocation,
    selectedCrop,
    addCrop,
  } = useGardenPlanner();

  return (
    <div className="modal">
      <div className="locations-list">
        <h2>List of Locations</h2>
        <ul>
          {!allLocations && <p>No locations here yet...</p>}
          {allLocations &&
            allLocations.map((item, index) => (
              <li key={`location-${index}`}>
                <h3>{item.location}</h3>
                <button
                  onClick={() => {
                    addCrop(
                      selectedCrop.id,
                      selectedCrop.name,
                      selectedCrop.imageURL,
                      item.id
                    );
                    setChoosingLocation(!choosingLocation);
                  }}
                >
                  Add
                </button>
              </li>
            ))}
        </ul>
        <p onClick={() => setChoosingLocation(false)}>Go Back</p>
      </div>
    </div>
  );
}
