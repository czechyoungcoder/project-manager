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

function App() {
  const [activeTab, setActiveTab] = useState(TabOptions.Tasks);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
    const storedProjects = getProjects();
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

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
        return (
          <TasksList tasks={tasks} deleteTask={deleteTask} addTask={addTask} />
        );
      case TabOptions.Stats:
        return "3";
      default:
        return null;
    }
  };

  const changeTab = (tabOption) => {
    setActiveTab(TabOptions[tabOption]);
  };

  return (
    <div className="container">
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
