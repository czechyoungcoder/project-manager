import React, { useState } from "react";
import "./TasksList.css";
import TaskModal from "./TaskModal";
import Project from "../models/Project";
import { formatDate, formatTime } from "../utils/timeUtils";

export default function TasksList({ tasks, projects, addTask, deleteTask }) {
  const [modalOpen, setModalOpen] = useState(false);

  const switchModal = () => {
    setModalOpen(!modalOpen);
  };

  const getTotalTime = () => {
    let totalTimeMilliseconds = 0;
    const today = new Date().setHours(0, 0, 0, 0);

    tasks.forEach((task) => {
      if (new Date(task.startTime).setHours(0, 0, 0, 0) === today) {
        const taskDurationMilliseconds =
          new Date(task.endTime) - new Date(task.startTime);
        totalTimeMilliseconds += taskDurationMilliseconds;
      }
    });

    const totalTime = new Date(totalTimeMilliseconds);

    const formattedTotalTime = formatTime(totalTime);

    return formattedTotalTime;
  };

  return (
    <>
      {modalOpen && (
        <TaskModal
          projects={projects}
          onSubmit={(taskData) => {
            addTask(taskData);
            switchModal();
          }}
          onClose={switchModal}
        />
      )}

      <div className="row">
        <h1>Dnes odpracováno: {getTotalTime()} </h1>
        <button className="btn-add" onClick={switchModal}>
          ➕ Nový záznam
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Úkol</th>
              <th>Projekt</th>
              <th>Začátek</th>
              <th>Konec</th>
              <th>Celkem</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task, index) => {
                const [startDate, startTime] = formatDate(task.startTime);
                const [endDate, endTime] = formatDate(task.endTime);
                const totalTime = formatTime(
                  new Date(task.endTime) - new Date(task.startTime)
                );

                return (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>
                      {projects.find((p) => p.id == task.projectId).title}
                    </td>
                    <td>
                      {startDate}
                      <br></br>
                      {startTime}
                    </td>
                    <td>
                      {endDate}
                      <br></br>
                      {endTime}
                    </td>
                    <td>{totalTime}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        smazat
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
