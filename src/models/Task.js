class Task {
    constructor(title, startTime, project) {
      this.title = title;
      this.startTime = startTime;
      this.endTime = endTime;
      this.project = project;
      this.completed = false;
    }

    constructor(title, startTime, endTime, project) {
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