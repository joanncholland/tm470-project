import React, { useState } from "react";
import { useTaskList } from "../../contexts/TaskListContext";

import "./EditTaskModal.scss";

export default function EditTaskModal({ id, title, date, setIsEditing }) {
  const { reformatDate, editTask } = useTaskList();
  const [editingTitle, setEditingTitle] = useState(title);
  const [editingDate, setEditingDate] = useState(reformatDate(date));

  async function handleSubmit() {
    try {
      await editTask(id, editingTitle, editingDate);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="edit-task-modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Task</h2>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={editingTitle}
            onChange={(e) => {
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
