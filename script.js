// Get existing todos from localStorage or start with an empty list
let todos = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Setup event listeners once the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (e) => e.key === "Enter" && addTask());
  deleteButton.addEventListener("click", deleteAllTasks);
  renderTasks();
});

// Add a new task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    todos.push({ text: taskText, done: false });
    saveTasks();
    todoInput.value = "";
    renderTasks();
  }
}

// Render all tasks
function renderTasks() {
  todoList.innerHTML = todos.map((task, i) => `
    <div class="todo-container">
      <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${i})">
      <p class="${task.done ? "disabled" : ""}" onclick="editTask(${i})">${task.text}</p>
    </div>
  `).join("");
  todoCount.textContent = todos.length;
}

// Edit a task
function editTask(index) {
  const newText = prompt("Edit task", todos[index].text);
  if (newText !== null) {
    todos[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Toggle task done/undone
function toggleTask(index) {
  todos[index].done = !todos[index].done;
  saveTasks();
  renderTasks();
}

// Delete all tasks
function deleteAllTasks() {
  todos = [];
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("todo", JSON.stringify(todos));
}
