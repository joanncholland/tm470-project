import React, { useContext, useState, useEffect } from "react";
// import { database } from "../firebase";
import axios from "axios";

// import { useAuth } from "../contexts/UserAuthContext";

const GardenPlannerContext = React.createContext();

export function useGardenPlanner() {
  return useContext(GardenPlannerContext);
}

export function GardenPlannerProvider({ children }) {
  const [allCropData, setAllCropData] = useState(null);
  const [specificCropData, setSpecificCropData] = useState(null);
  //   const { currentUser } = useAuth();

  // get API endpoint for all crops
  function getMainEndpoint() {
    return `https://harvesthelper.herokuapp.com/api/v1/plants?api_key=${process.env.REACT_APP_HARVEST_HELPER_API_KEY}`;
  }

  // get API specific endpoint from id
  function getSpecificEndpoint(plantID) {
    return `https://harvesthelper.herokuapp.com/api/v1/plants/${plantID}?api_key=${process.env.REACT_APP_HARVEST_HELPER_API_KEY}`;
  }

  // get API data for all crops
  function retrieveAllCropData() {
    axios
      .get(getMainEndpoint())
      .then((res) => {
        const cropData = res.data;
        cropData.sort(function (first, second) {
          let a = first.name;
          let b = second.name;
          return a < b ? -1 : a > b ? 1 : 0;
        });
        setAllCropData(cropData);
      })
      .catch((error) => console.log(error));
  }

  // get API data for specific crop from id
  function retrieveSpecificCropData(plantID) {
    axios
      .get(getSpecificEndpoint(plantID))
      .then((res) => {
        setSpecificCropData(res.data);
      })
      .catch((error) => console.log(error));
  }

  // get endpoint for image based on last part of URL
  function getFullImageURL(image_url) {
    return `https://res-1.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`;
  }

  useEffect(() => {
    retrieveAllCropData();
  }, [allCropData]);

  const value = {
    getMainEndpoint,
    getSpecificEndpoint,
    retrieveSpecificCropData,
    allCropData,
    specificCropData,
    getFullImageURL,
  };

  return (
    <GardenPlannerContext.Provider value={value}>
      {children}
    </GardenPlannerContext.Provider>
  );
}
