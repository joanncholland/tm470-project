import React, { useState } from "react";
import { useGardenPlanner } from "../../contexts/GardenPlannerContext";

import "./NotesModal.scss";

export default function NotesModal({ notes, cropID, setNotesOpen, notesOpen }) {
  const { updateCropNotes } = useGardenPlanner();
  const [editing, setEditing] = useState(false);
  const [notesChanges, setNotesChanges] = useState(notes);

  return (
    <div id="notes-modal">
      <div id="note">
        <h2>Notes</h2>
        {!editing && (
          <>
            <p>{notes && notes}</p>
            <p
              onClick={() => {
                setEditing(!editing);
              }}
            >
              Edit
            </p>
            <p
              onClick={() => {
                setNotesOpen(!notesOpen);
              }}
            >
              Close
            </p>
          </>
        )}
        {editing && (
          <>
            {" "}
            <textarea
              defaultValue={notes && notesChanges}
              name="notes"
              id="notes"
              cols="30"
              rows="10"
              onChange={(e) => {
                setNotesChanges(e.target.value);
              }}
            ></textarea>
            <p
              onClick={() => {
                updateCropNotes(cropID, notesChanges);
                setEditing(!editing);
              }}
            >
              Submit
            </p>
            <p
              onClick={() => {
                setNotesOpen(!notesOpen);
              }}
            >
              Close
            </p>
          </>
        )}
      </div>
    </div>
  );
}
