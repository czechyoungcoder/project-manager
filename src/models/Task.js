import { v4 as uuidv4 } from "uuid";

export default class Task {
  constructor(
    title,
    projectId,
    completed = false,
    startTime = new Date(),
    endTime = new Date()
  ) {
    this.id = uuidv4();
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.projectId = projectId;
    this.completed = completed;
  }

  markCompleted() {
    this.completed = true;
  }
}
