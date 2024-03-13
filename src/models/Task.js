import { v4 as uuidv4 } from "uuid";

export default class Task {
  constructor(title, startTime, endTime = null, project, completed = false) {
    this.id = uuidv4();
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.project = project;
    this.completed = completed;
  }

  markCompleted() {
    this.completed = true;
  }
}
