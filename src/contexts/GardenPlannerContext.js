import React, { useContext, useState, useEffect } from "react";
import { database } from "../firebase";
import axios from "axios";

import { useAuth } from "../contexts/UserAuthContext";

const GardenPlannerContext = React.createContext();

export function useGardenPlanner() {
  return useContext(GardenPlannerContext);
}

export function GardenPlannerProvider({ children }) {
  const [allCropData, setAllCropData] = useState(null);
  const [specificCropData, setSpecificCropData] = useState(null);
  const [allLocations, setAllLocations] = useState(null);
  const [choosingLocation, setChoosingLocation] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [allCropNotes, setAllCropNotes] = useState([]);
  const [specificCropNotes, setSpecificCropNotes] = useState("");
  const { currentUser } = useAuth();

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

  // get all crop notes
  async function getAllCropNotes() {
    await database
      .ref(`users/${currentUser.uid}/cropNotes`)
      .on("value", (snapshot) => {
        if (snapshot) {
          snapshot.val() && setAllCropNotes(snapshot.val());
        }
      });
  }

  // add new note for crop
  async function addCropNote(cropID, note) {
    await database
      .ref(`users/${currentUser.uid}/cropNotes/${cropID}`)
      .set({ notes: `${note}` });
  }

  // edit crop for specific crop
  async function editCropNote(cropID, note) {}

  // get specific crop notes from crop ID
  async function getSpecificCropNotes(cropID) {
    await database
      .ref(`users/${currentUser.uid}/cropNotes/${cropID}`)
      .on("value", (snapshot) => {
        if (snapshot) {
          console.log(snapshot.val());
          snapshot.val() && setSpecificCropNotes(snapshot.val().notes);
        }
      });
  }

  // add new garden location
  async function addLocation(location) {
    await database.ref(`users/${currentUser.uid}/locations`).push({
      location,
    });
  }

  // get all garden locations
  async function getLocations() {
    return database
      .ref(`users/${currentUser.uid}/locations`)
      .on("value", (snapshot) => {
        if (snapshot) {
          let locations = [];
          snapshot.forEach((child) => {
            // Object.entries(child.val().crops).forEach((item) => {
            //   cropIDList.push(item[1].cropID);
            //   if (cropIDList.includes(item[1].cropID)) {
            //     setCropIDList(cropIDList);
            //   }
            // });
            locations.push({
              id: child.key,
              ...child.val(),
            });
          });
          setAllLocations(locations);
        }
      });
  }

  // add crop with the API index and location firebase ID
  async function addCrop(cropID, cropName, cropImageURL, locationID) {
    await database
      .ref(`users/${currentUser.uid}/locations/${locationID}/crops`)
      .push({ cropID, name: cropName, imageURL: cropImageURL });

    await database
      .ref(`users/${currentUser.uid}/cropNotes`)
      .child(cropID)
      .setValue("");
  }

  async function deleteLocation(locationID) {
    await database
      .ref(`users/${currentUser.uid}/locations/${locationID}`)
      .remove()
      .then(function () {
        console.log("location removed");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function deleteCrop(locationID, cropID) {
    await database
      .ref(`users/${currentUser.uid}/locations/${locationID}/crops/${cropID}`)
      .remove()
      .then(function () {
        console.log("crop removed");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (currentUser) {
      retrieveAllCropData();
      getLocations();
      getAllCropNotes();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCrop, specificCropData]);

  const value = {
    getMainEndpoint,
    getSpecificEndpoint,
    retrieveSpecificCropData,
    allCropData,
    specificCropData,
    setSpecificCropData,
    getFullImageURL,
    addLocation,
    allLocations,
    setChoosingLocation,
    choosingLocation,
    setSelectedCrop,
    selectedCrop,
    addCrop,
    deleteLocation,
    deleteCrop,
    getSpecificCropNotes,
    allCropNotes,
  };

  return (
    <GardenPlannerContext.Provider value={value}>
      {children}
    </GardenPlannerContext.Provider>
  );
}
