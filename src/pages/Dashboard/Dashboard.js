import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Weather from "../../components/Weather/Weather";
import { useTaskList } from "../../contexts/TaskListContext";
import Task from "../../components/Task/Task";

import "./Dashboard.scss";
import gardeningIllustration from "../../assets/images/gardeningIllustration.png";

export default function Dashboard() {
  const { todaysTasks } = useTaskList();
  useEffect(() => {}, []);

  return (
    <div className="row">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <h2>Today's Weather</h2>
        <Weather />
        <h2>Today's Tasks</h2>

        <div className="todays-tasks">
          <ul>
            {todaysTasks &&
              todaysTasks.map((item, key) => {
                return <Task key={key} task={item} />;
              })}
            <Link to="task-list">
              <button>Manage Tasks</button>
            </Link>
          </ul>
        </div>
      </div>
      <div className="illustration">
        <img src={gardeningIllustration} alt="Gardening illustration" />
      </div>
    </div>
  );
}
