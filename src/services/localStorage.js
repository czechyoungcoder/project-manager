export const getTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
      id: "1",
      title: "Complete project proposal",
      startTime: "2024-03-13T08:00:00.000Z",
      endTime: "2024-03-13T12:00:00.000Z",
      projectId: "1",
      completed: true,
    },
    {
      id: "2",
      title: "Attend team meeting",
      startTime: "2024-03-13T13:00:00.000Z",
      endTime: "2024-03-13T14:00:00.000Z",
      projectId: "2",
      completed: false,
    },
    {
      id: "3",
      title: "Review documentation",
      startTime: "2024-03-13T09:30:00.000Z",
      endTime: "2024-03-13T11:30:00.000Z",
      projectId: "3",
      completed: false,
    },
  ];
  return tasks;
};

export const saveTasks = (tasks) => {
  if (tasks) localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getProjects = () => {
  const projects = JSON.parse(localStorage.getItem("projects")) || [
    {
      id: "1",
      title: "School",
    },
    {
      id: "2",
      title: "Website",
    },
    {
      id: "3",
      title: "Work",
    },
  ];
  return projects;
};

export const saveProjects = (projects) => {
  if (projects) localStorage.setItem("projects", JSON.stringify(projects));
};
