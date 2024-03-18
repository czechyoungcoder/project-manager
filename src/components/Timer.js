import React, { useState } from "react";
import Task from "../models/Task";
import "./Timer.css";
import { formatDate, formatTime } from "../utils/timeUtils";

export default function Timer({ projects, getTask, onStart, onPause, onStop }) {
  const [formData, setFormData] = useState({
    title: "",
    projectId: "",
    isRunning: Boolean(getTask()),
  });

  const getTime = () => {
    return getTask()
      ? formatTime(new Date(getTask().endTime) - new Date(getTask().startTime))
      : null;
  };

  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "isRunning") {
      value = checked;
      if (checked) {
        console.log(getTask());

        if (!getTask() && formData.title && formData.projectId) {
          onStart(new Task(formData.title, formData.projectId));
        } else {
          onStart();
        }
      } else {
        onPause();
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const stopTimer = () => {
    onStop();
    setFormData({
      title: "",
      projectId: "",
      isRunning: false,
    });
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
        <h2 className="timer-time">{getTime() ? getTime() : "00:00:00"}</h2>
        <label
          onDoubleClick={stopTimer}
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
