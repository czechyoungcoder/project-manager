import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "../models/Task";
import { getProjects } from "../services/localStorage";
import "./Modal.css";
import { combineDateTime, formatDate, formatTime } from "../utils/timeUtils";

export default function TaskModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startHH: "",
    startMM: "",
    endHH: "",
    endMM: "",
    project: "",
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startTime = combineDateTime(
      formData.date,
      formData.startHH,
      formData.startMM
    );
    const endTime = combineDateTime(
      formData.date,
      formData.endHH,
      formData.endMM
    );
    const newTask = new Task(
      formData.title,
      startTime,
      endTime,
      formData.project
    );
    onSubmit(newTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Nový záznam</h4>
        <button className="close" onClick={onClose}>
          ❌
        </button>
        <hr></hr>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="project">Project:</label>
            <select
              required
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Činnost</label>
            <input
              required
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Den</label>
            <input
              required
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group time-grid">
            <label htmlFor="startHH">Začátek</label>
            <div className="time-group">
              <input
                required
                className="time-slot"
                type="number"
                id="startHH"
                name="startHH"
                value={formData.startHH}
                onChange={handleChange}
                placeholder="HH"
                min="0"
                step="1"
                max="23"
              />
              :
              <input
                required
                className="time-slot"
                type="number"
                id="startMM"
                name="startMM"
                value={formData.startMM}
                onChange={handleChange}
                placeholder="MM"
                min="0"
                step="1"
                max="59"
              />
            </div>

            <span className="time-total">
              {formData.date &&
                formData.startHH &&
                formData.startMM &&
                formData.endHH &&
                formData.endMM &&
                formatTime(
                  new Date(
                    combineDateTime(
                      formData.date,
                      formData.endHH,
                      formData.endMM
                    ) -
                      combineDateTime(
                        formData.date,
                        formData.startHH,
                        formData.startMM
                      )
                  )
                )}
            </span>

            <label htmlFor="endHH">Konec</label>
            <div className="time-group">
              <input
                required
                className="time-slot"
                type="number"
                id="endHH"
                name="endHH"
                value={formData.endHH}
                onChange={handleChange}
                placeholder="HH"
                min="0"
                step="1"
                max="23"
              />
              :
              <input
                className="time-slot"
                type="number"
                id="endMM"
                name="endMM"
                value={formData.endMM}
                onChange={handleChange}
                placeholder="MM"
                min="0"
                step="1"
                max="59"
              />
            </div>
          </div>

          <button className="submit" type="submit">
            ✅ Přidat
          </button>
        </form>
      </div>
    </div>
  );
}
