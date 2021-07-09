import React, { useContext, useState, useEffect } from "react";
import { database } from "../firebase";
import { useAuth } from "../contexts/UserAuthContext";

const TaskListContext = React.createContext();

export function useTaskList() {
  return useContext(TaskListContext);
}

export function TaskListProvider({ children }) {
  const { currentUser } = useAuth();
  const [taskList, setTaskList] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState(null);
  const [todaysTasks, setTodaysTasks] = useState(null);

  // load upcoming tasks from database
  async function loadTasks() {
    await database
      .ref(`users/${currentUser.uid}/tasks`)
      .orderByChild("date")
      .startAt(`${getTodaysDateTimestamp()}`)
      .limitToFirst(10)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          let tasks = [];
          snapshot.forEach((child) => {
            tasks.push({
              id: child.key,
              ...child.val(),
            });
          });
          setTaskList(tasks);
        }
      });
  }

  // load overdue tasks from database
  async function loadOverdueTasks() {
    await database
      .ref(`users/${currentUser.uid}/tasks`)
      .orderByChild("date")
      .endAt(`${getTodaysDateTimestamp() - 86400000}`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          let tasks = [];
          snapshot.forEach((child) => {
            tasks.push({
              id: child.key,
              ...child.val(),
            });
          });
          setOverdueTasks(tasks);
        }
      });
  }

  async function getTodaysTasks() {
    await database
      .ref(`users/${currentUser.uid}/tasks`)
      .orderByChild("date")
      .equalTo(getTodaysDateTimestamp().toString())
      .on("value", (snapshot) => {
        if (snapshot) {
          let tasks = [];
          snapshot.forEach((child) => {
            tasks.push({
              id: child.key,
              ...child.val(),
            });
          });
          setTodaysTasks(tasks);
        }
      });
  }

  function getTodaysDateTimestamp() {
    let today = new Date();
    let fullDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      1,
      0,
      0
    );

    return fullDate.getTime();
  }

  function addTask(date, title) {
    database.ref(`users/${currentUser.uid}/tasks`).push({
      date: `${convertDateToUNIX(date)}`,
      title: `${title}`,
      completed: false,
    });
  }

  function deleteTask(taskID) {
    database
      .ref(`users/${currentUser.uid}/tasks/${taskID}`)
      .remove()
      .then(function () {
        console.log("task removed");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editTask(taskID, title, date) {
    database.ref(`users/${currentUser.uid}/tasks/${taskID}`).set({
      completed: false,
      title,
      date: convertDateToUNIX(date).toString(),
    });
  }

  function setCompleted(taskID) {
    database
      .ref(`users/${currentUser.uid}/tasks/${taskID}`)
      .get()
      .then(function (snapshot) {
        let task = snapshot.val();
        if (task) {
          const { completed, ...rest } = task;
          database
            .ref(`users/${currentUser.uid}/tasks/${taskID}`)
            .set({ completed: !completed, ...rest });
        }
      });
  }

  function convertDateToUNIX(date) {
    return new Date(date).getTime();
  }

  function convertUNIXToDate(unix) {
    let date = new Date(parseInt(unix));
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function reformatDate(date) {
    // dd/mm/yyyy -> yyyy-mm-dd
    let arr = convertUNIXToDate(date).split("/");
    if (arr[1] < 10) {
      arr[1] = "0" + arr[1];
    }
    let newDate = arr.reverse().join("-");
    return newDate;
  }

  useEffect(() => {
    if (currentUser) {
      loadOverdueTasks();
      loadTasks();
      getTodaysTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const value = {
    addTask,
    taskList,
    convertUNIXToDate,
    setCompleted,
    deleteTask,
    overdueTasks,
    todaysTasks,
    editTask,
    reformatDate,
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}
