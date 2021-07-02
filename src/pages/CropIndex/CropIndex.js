import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";
import Crop from "../../components/Crop/Crop";

// STYLES
import "./CropIndex.scss";

export default function CropIndex() {
  const [searchInput, setSearchInput] = useState("");
  const { allCropData } = useGardenPlanner();

  return (
    <div className="container">
      <div className="crop-index">
        <h1>Crop Index</h1>

        {/** CROP SEARCH OR ADD */}
        <h2>Find or Add Crop</h2>
        <div className="crop-search-add">
          <form>
            <div className="search-input">
              <label htmlFor="search">
                <small>Search for a crop</small>
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Begin typing to search"
                value={searchInput}
                onChange={(e) => setSearchInput(toTitleCase(e.target.value))}
              />
            </div>
          </form>
        </div>

        {/**+ CROP LIST */}
        <h2>List of Crops</h2>
        {!allCropData && <p>Loading crop list...</p>}
        <ul>
          {allCropData &&
            allCropData
              .filter(
                (filter) =>
                  filter.name.includes(searchInput) || searchInput === ""
              )
              .map((item, index) => {
                return (
                  <li key={index}>
                    {/** CROP COMPONENT */}
                    <Crop cropInfo={item} />
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}

// convert search input to title case for searching list of crops
// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
