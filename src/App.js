import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getTasks,
  saveTasks,
  getProjects,
  saveProjects,
} from "./services/localStorage";
import TasksList from "./components/TasksList";
import ProjectsList from "./components/ProjectsList";
import Timer from "./components/Timer";

function App() {
  const [activeTab, setActiveTab] = useState(TabOptions.Tasks);
  const [tasks, setTasks] = useState();
  const [projects, setProjects] = useState();
  const [timerId, setTimerId] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedTasks = getTasks();
    const storedProjects = getProjects();
    setProjects(storedProjects);
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    const storedTimer = localStorage.getItem("timer");
    if (storedTimer && isReady) {
      const task = tasks.find((task) => task.id === storedTimer);
      if (task) {
        startTimer(task);
      }
    }
  }, [isReady]);

  useEffect(() => {
    if (tasks) {
      setIsReady(true);
    }
  }, [tasks]);

  const addTask = (record) => {
    setTasks([...tasks, record]);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };
  const addProject = (record) => {
    setProjects([...projects, record]);
  };

  const renderTab = () => {
    switch (activeTab) {
      case TabOptions.Projects:
        return <ProjectsList />;
      case TabOptions.Tasks:
        return tasks ? (
          <TasksList
            tasks={tasks}
            projects={projects}
            deleteTask={deleteTask}
            addTask={addTask}
          />
        ) : null;
      case TabOptions.Stats:
        return "3";
      default:
        return null;
    }
  };

  const changeTab = (tabOption) => {
    setActiveTab(TabOptions[tabOption]);
  };

  const startTimer = (task) => {
    const id = task.id;
    if (!tasks.find((t) => t.id === id)) {
      addTask(task);
    }

    const timerId = setInterval(() => {
      setTasks((prevTasks) => {
        const updatedTaskIndex = prevTasks.findIndex((t) => t.id === id);

        if (updatedTaskIndex === -1) return prevTasks;

        const updatedTask = {
          ...prevTasks[updatedTaskIndex],
          endTime:
            new Date(prevTasks[updatedTaskIndex].endTime).getTime() + 1000,
        };

        const updatedTasks = [...prevTasks];
        updatedTasks[updatedTaskIndex] = updatedTask;

        return updatedTasks;
      });
    }, 1000);

    localStorage.setItem("timer", task.id);
    setTimerId(timerId);
  };

  const getCurrentTimer = () => {
    const taskId = localStorage.getItem("timer");
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        return task.endTime;
      }
    }
    return;
  };

  return (
    <div className="container">
      {projects ? (
        <Timer
          projects={projects}
          onStart={startTimer}
          getTime={getCurrentTimer}
        />
      ) : null}
      <div className="tab-window">
        <nav className="tab-menu">
          <ul className="tab-list">
            <li
              className={activeTab === TabOptions.Tasks ? "active" : ""}
              onClick={() => changeTab(TabOptions.Tasks)}
            >
              Přehled
            </li>
            <li
              className={activeTab === TabOptions.Projects ? "active" : ""}
              onClick={() => changeTab(TabOptions.Projects)}
            >
              Projekty
            </li>
          </ul>
        </nav>

        {renderTab()}
      </div>
    </div>
  );
}

const TabOptions = {
  Projects: "Projects",
  Tasks: "Tasks",
  Stats: "Stats",
};

export default App;
