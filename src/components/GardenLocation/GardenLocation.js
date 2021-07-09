import React from "react";
import { Link } from "react-router-dom";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";

import "./GardenLocation.scss";

export default function GardenLocation({ id, location, crops }) {
  const { deleteLocation, deleteCrop } = useGardenPlanner();

  return (
    <div className="garden-location">
      <div className="garden-location-title">
        <h3>{location}</h3>
        <p onClick={() => deleteLocation(id)}>Delete Location</p>
      </div>
      <ul>
        {crops &&
          Object.entries(crops).map(([key, value]) => {
            return (
              <li key={key}>
                <div className="crop-info">
                  <div className="img-container">
                    <img src={value.imageURL} alt={value.name} />
                  </div>
                  {value.name}
                </div>

                <p>
                  <Link to={`/crop-index/${value.cropID}`}>View Info</Link>
                </p>
                <p
                  className="delete-link"
                  onClick={() => {
                    deleteCrop(id, key);
                  }}
                >
                  Delete Crop
                </p>
              </li>
            );
          })}
      </ul>
      <div className="btn-container">
        <button>
          <Link to="/crop-index">Add Crop</Link>
        </button>
      </div>
    </div>
  );
}
