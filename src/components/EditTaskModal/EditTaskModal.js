import React, { useState } from "react";
import { useTaskList } from "../../contexts/TaskListContext";

import "./EditTaskModal.scss";

export default function EditTaskModal({ id, title, date, setIsEditing }) {
  const { reformatDate, editTask } = useTaskList();
  const [editingTitle, setEditingTitle] = useState(title);
  const [editingDate, setEditingDate] = useState(reformatDate(date));

  async function handleSubmit(e) {
    try {
      await editTask(id, editingTitle, editingDate);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={editingTitle}
            onChange={(e) => {
              console.log(e.target.value);
              setEditingTitle(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={editingDate}
            onChange={(e) => {
              console.log(e.target.value);
              setEditingDate(e.target.value);
            }}
          />
        </div>
        <button type="submit">Confirm</button>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
