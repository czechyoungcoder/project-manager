import React, { useState, useEffect } from 'react';
import './App.css';
import { getTasks, saveTasks, getProjects, saveProjects } from './services/localStorage';
import TasksList from './components/TasksList';
import ProjectsList from './components/ProjectsList';

function App() {
  const [activeTab, setActiveTab] = useState(TabOptions.Tasks);

  const renderTab = () => {
    switch(activeTab) {
      case TabOptions.Projects:
        return <ProjectsList> </ProjectsList>;
      case TabOptions.Tasks:
        return <TasksList> </TasksList>;
      case TabOptions.Stats:
        return "3";
      default:
        return null;
    }
  };

  const changeTab = (tabOption) => {
    setActiveTab(TabOptions[tabOption]);
  }

  return (
    <div className="container">
      <div className="tab-window">
        <nav className="tab-menu">
          <ul className="tab-list">
            <li className={activeTab === TabOptions.Tasks ? 'active-tab' : ''} onClick={() => changeTab(TabOptions.Tasks)}>Přehled</li>
            <li className={activeTab === TabOptions.Projects ? 'active-tab' : ''} onClick={() => changeTab(TabOptions.Projects)}>Projekty</li>
          </ul>
        </nav>
        {renderTab()}
      </div>
    </div>
    );
}

const TabOptions = {
  Projects: 'Projects',
  Tasks: 'Tasks',
  Stats: 'Stats',
};

export default App;
