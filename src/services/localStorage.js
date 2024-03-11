export const getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getProjects = () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    return projects;
};

export const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
};