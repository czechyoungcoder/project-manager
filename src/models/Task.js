import { v4 as uuidv4 } from 'uuid';

class Task {
    constructor(title, startTime, project) {
      this.id = uuidv4();
      this.title = title;
      this.startTime = startTime;
      this.endTime = null;
      this.project = project;
      this.completed = false;
    }

    constructor(title, startTime, endTime, project) {
        this.id = uuidv4();
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.project = project;
        this.completed = true;
      }
  
    markCompleted() {
      this.completed = true;
    }
  }
  
  export default Task;