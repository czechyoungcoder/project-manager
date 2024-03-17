import React, { useState } from "react";
import Task from "../models/Task";
import "./Timer.css";

// export default function Timer( projects, task, onStart, onStop }) {

export default function Timer({ projects, onStart, getTime }) {
  const storedTimer = localStorage.getItem("timer");

  const [formData, setFormData] = useState({
    title: "",
    projectId: "",
    isRunning: false,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name == "isRunning") {
      const checked = e.target.checked;
      value = checked;
      if (checked && formData.title && formData.projectId) {
        onStart(new Task(formData.title, formData.projectId));
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="timer">
      <div className="form-group">
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Zadejte název činnosti..."
        />
      </div>

      <div className="form-group">
        <select
          required
          id="projectId"
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
        >
          <option value="" disabled>
            Vyber projekt
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <h2 className="timer-time">{getTime()}</h2>
        <label
          className={`play-button-checkbox ${
            formData.isRunning ? "running" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={formData.isRunning}
            onChange={handleChange}
            name="isRunning"
          />
          <span className="play-button"></span>
        </label>
      </div>
    </form>
  );
}
