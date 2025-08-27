const addBtn = document.getElementById("add-btn");
const inputField = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Retrieve and display saved tasks from localStorage
function getTasks() {
  let savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Build new task
function addTask(text, isCompleted = false) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  if (isCompleted) {
    todoItem.classList.add("completed");
  }

  const todoContent = document.createElement("li");
  todoContent.className = "todo-content";
  todoContent.textContent = text;

  // Checkbox
  const isDone = document.createElement("input");
  isDone.type = "checkbox";
  isDone.className = "todo-checkbox";
  isDone.checked = isCompleted;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  const deleteIcon = document.createElement("img");
  deleteIcon.className = "delete-icon";
  deleteIcon.src = "assets/imgs/trash-solid-full.svg";
  deleteIcon.alt = "Delete Icon";
  deleteBtn.appendChild(deleteIcon);

  // When Delete button is clicked
  deleteBtn.addEventListener("click", function () {
    todoItem.remove();
    let tasks = getTasks().filter((t) => t.text !== text);
    saveTasks(tasks);
  });

  // When checkbox is toggled
  isDone.addEventListener("change", function () {
    todoItem.classList.toggle("completed", isDone.checked);
    let tasks = getTasks().map((t) =>
      t.text === text ? { ...t, isCompleted: isDone.checked } : t
    );
    saveTasks(tasks);
  });

  todoItem.appendChild(todoContent);
  todoItem.appendChild(isDone);
  todoItem.appendChild(deleteBtn);
  todoList.appendChild(todoItem);
}

// When add btn is clicked
addBtn.addEventListener("click", function () {
  const todoText = inputField.value.trim();
  if (todoText) {
    addTask(todoText, false);
    let tasks = getTasks();
    tasks.push({ text: todoText, isCompleted: false });
    saveTasks(tasks);
    inputField.value = "";
    const note = document.getElementById("add-task-notification");
    note.textContent = "Task added successfully!";
    note.style.display = "block";
    // Hide notification after 2 seconds
    setTimeout(() => {
      note.style.display = "none";
    }, 2000);
  } else {
    alert("Please enter a todo item.");
  }
});

// When "Enter" is pressed
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// When Page reload
window.addEventListener("load", () => {
  getTasks().forEach((task) => addTask(task.text, task.isCompleted));
});
