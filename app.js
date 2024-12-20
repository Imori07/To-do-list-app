console.log("test");

// Select the necessary elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to update the task list in the UI
function updateTaskList() {
  taskList.innerHTML = ""; // Clear the current list
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    // Create task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    li.appendChild(taskText);

    // Mark task as completed
    taskText.addEventListener("click", () => toggleTaskCompletion(index));

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(index));
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = ""; // Clear the input field
    updateTaskList();
    saveTasks();
  }
}

// Function to toggle the completion of a task
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  saveTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
  saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listener to the "Add Task" button
addTaskButton.addEventListener("click", addTask);

// Load tasks when the page loads
updateTaskList();
