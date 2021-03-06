import React, { useState, useEffect } from "react";
import { useTaskList } from "../../contexts/TaskListContext";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

import "./Task.scss";

export default function Task({ task }) {
  const { title, date, id, completed } = task;
  const { convertUNIXToDate, setCompleted, deleteTask } = useTaskList();
  const [checked, setChecked] = useState(false);
  const [todaysDate, setTodaysDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDate, setEditingDate] = useState("");

  function handleChange() {
    // set the completed status in this component's state
    setChecked(!checked);
    setCompleted(id);
  }

  // get the current date, which is used to display 'Today' if the task is due on the current day
  function getTodaysDate() {
    let today = new Date();

    let fullDate = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;

    setTodaysDate(fullDate);
  }

  useEffect(() => {
    getTodaysDate();
    return () => {
      setTodaysDate("");
    };
  }, [todaysDate]);

  return (
    <li className="task">
      {isEditing && (
        <EditTaskModal
          id={id}
          title={editingTitle}
          date={editingDate}
          setIsEditing={setIsEditing}
        />
      )}
      {!isEditing && (
        <div className="task-info">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <p>{title}</p>
          <small>
            {convertUNIXToDate(date) === todaysDate
              ? "Today"
              : convertUNIXToDate(date)}
          </small>
        </div>
      )}

      {!isEditing && (
        <div className="task-controls">
          <p
            className="edit-task"
            onClick={() => {
              setIsEditing(!isEditing);
              setEditingTitle(title);
              setEditingDate(date);
            }}
          >
            Edit
          </p>
          <p className="delete-task" onClick={() => deleteTask(id)}>
            Delete
          </p>
        </div>
      )}
    </li>
  );
}
