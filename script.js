const addBtn = document.getElementById("add-btn");
const inputField = document.getElementById("todo-input");

addBtn.addEventListener("click", function () {
  const todoText = inputField.value.trim();
  if (todoText) {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    const todoContent = document.createElement("li");
    todoContent.className = "todo-content";
    todoContent.textContent = todoText;

    // Create checkbox for this item
    const isDone = document.createElement("input");
    isDone.type = "checkbox";
    isDone.className = "todo-checkbox";

    // Create delete button for this item
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    const deleteIcon = document.createElement("img");
    deleteIcon.className = "delete-icon";
    deleteIcon.src = "assets/imgs/trash-solid-full.svg";
    deleteIcon.alt = "Delete Icon";
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener("click", function () {
      todoItem.remove();
    });

    isDone.addEventListener("change", function () {
      if (isDone.checked) {
        todoItem.classList.add("completed");
        const todoList = document.getElementById("todo-list");
        todoList.appendChild(todoItem);
      } else {
        todoItem.classList.remove("completed");
        const todoList = document.getElementById("todo-list");
        todoList.insertBefore(todoItem, todoList.firstChild);
      }
    });

    todoItem.appendChild(todoContent);
    todoItem.appendChild(isDone);
    todoItem.appendChild(deleteBtn);

    document.getElementById("todo-list").appendChild(todoItem);
    inputField.value = ""; // Clear the input field after adding
  } else {
    alert("Please enter a todo item.");
  }
});
