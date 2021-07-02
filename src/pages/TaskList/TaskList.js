import React, { useRef, useState, useEffect } from "react";
import { useTaskList } from "../../contexts/TaskListContext";
import Task from "../../components/Task/Task";

import "./TaskList.scss";

export default function TaskList() {
  const titleRef = useRef();
  const dateRef = useRef();
  const [error, setError] = useState("");
  const { addTask, taskList, overdueTasks } = useTaskList();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addTask(dateRef.current.value, titleRef.current.value);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="container">
      <div className="task-list">
        <h1>Task List</h1>
        {error && <p>{error}</p>}
        <div className="add-task">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="What's your next gardening task?"
                required
                ref={titleRef}
                autoFocus={true}
              />
            </div>
            <div className="input-field">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                placeholder="When does it need to be done?"
                required
                ref={dateRef}
              />
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="overdue-tasks">
          <h2>Overdue Tasks</h2>
          <ul>
            {overdueTasks &&
              overdueTasks.map((item, key) => <Task key={key} task={item} />)}
          </ul>
        </div>

        <div className="tasks">
          <h2>Upcoming Tasks</h2>
          <ul>
            {taskList &&
              taskList.map((item, key) => <Task key={key} task={item} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}
