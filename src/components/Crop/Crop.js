import React from "react";
import { Link } from "react-router-dom";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";

import "./Crop.scss";

export default function Crop({ cropInfo }) {
  const {
    getFullImageURL,
    setChoosingLocation,
    choosingLocation,
    setSelectedCrop,
  } = useGardenPlanner();
  const { name, image_url, id } = cropInfo;

  return (
    <div className="crop">
      <div className="crop-title">
        <div className="img-container">
          <img src={getFullImageURL(image_url)} alt={`${name}`} />
        </div>
        {name}
      </div>
      <div className="crop-btns">
        <button className="grey-btn">
          <Link to={`/crop-index/${id}`}>View Info</Link>
        </button>
        <button
          onClick={() => {
            setChoosingLocation(!choosingLocation);
            setSelectedCrop({ id, name, imageURL: getFullImageURL(image_url) });
          }}
        >
          Add to Planner
        </button>
      </div>
    </div>
  );
}
