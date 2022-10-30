const getTodos = () => ({
  url: "http://localhost:3000/todos",
  todos: [],
  task: "",
  required: false,
  init() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => (this.todos = data));
  },
  saveData() {
    if (!this.task) {
      this.required = true;
      return;
    }
    fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: this.task,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
        this.task = "";
      });
  },
  toggleDone(id, value) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        done: value,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
      });
  },
  deleteTask(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
      });
  },
});
