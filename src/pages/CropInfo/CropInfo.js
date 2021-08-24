import React, { useEffect, useState } from "react";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";
import NotesModal from "../../components/NotesModal/NotesModal";

import "./CropInfo.scss";

export default function CropInfo({ match }) {
  const currentPlantID = match.params.plantID;
  const {
    retrieveSpecificCropData,
    setSpecificCropData,
    specificCropData,
    getFullImageURL,
    getSpecificCropNotes,
    selectedCropNote,
  } = useGardenPlanner();
  const [error, setError] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);

  async function getCropData() {
    try {
      await retrieveSpecificCropData(currentPlantID);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    setSpecificCropData(null);
    getCropData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {notesOpen && selectedCropNote && (
        <NotesModal
          notes={selectedCropNote.notes}
          cropID={specificCropData.id}
          setNotesOpen={setNotesOpen}
          notesOpen={notesOpen}
        />
      )}
      {error && <p>{error}</p>}
      {!specificCropData && <p>Loading crop information...</p>}
      {specificCropData && (
        <div className="crop-info">
          <div className="crop-header">
            <div className="crop-info-title">
              <div className="img-container">
                <img
                  src={getFullImageURL(specificCropData.image_url)}
                  alt={`${specificCropData.name}`}
                />
              </div>
              <h1>{specificCropData.name}</h1>
            </div>
            <button
              onClick={() => {
                console.log(specificCropData);
                getSpecificCropNotes(specificCropData.id);
                setNotesOpen(!notesOpen);
              }}
            >
              Notes
            </button>
          </div>
          <h2>Description</h2>
          <p>{specificCropData.description}</p>
          <h2>Optimal Sun</h2>
          <p>{specificCropData.optimal_sun}</p>
          <h2>Optimal Soil</h2>
          <p>{specificCropData.optimal_soil}</p>
          <h2>Planting Considerations</h2>
          <p>{specificCropData.planting_considerations}</p>
          <h2>When to Plant</h2>
          <p>{specificCropData.when_to_plant}</p>
          <h2>Growing from Seed</h2>
          <p>{specificCropData.growing_from_seed}</p>
          <h2>Transplanting</h2>
          <p>{specificCropData.transplanting}</p>
          <h2>Spacing</h2>
          <p>{specificCropData.spacing}</p>
          <h2>Watering</h2>
          <p>{specificCropData.watering}</p>
          <h2>Feeding</h2>
          <p>{specificCropData.feeding}</p>
          <h2>Other Care</h2>
          <p>{specificCropData.other_care}</p>
          <h2>Diseases</h2>
          <p>{specificCropData.diseases}</p>
          <h2>Pests</h2>
          <p>{specificCropData.pests}</p>
          <h2>Harvesting</h2>
          <p>{specificCropData.harvesting}</p>
          <h2>Storage Use</h2>
          <p>{specificCropData.storage_use}</p>
        </div>
      )}
    </div>
  );
}
