import React from "react";

export default function NewCrop() {
  return (
    <div className="container">
      <div className="add-new-crop">
        <h1>Add New Crop</h1>
        <form>
          <div className="input-field">
            <label htmlFor="plant-name">Plant Name</label>
            <input
              type="text"
              name="plant-name"
              id="plant-name"
              placeholder="Enter plant name"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
