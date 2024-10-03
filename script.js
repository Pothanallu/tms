let tasks = [];
let editIndex = null;

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let taskName = document.getElementById("task-name").value;
    let taskDesc = document.getElementById("task-desc").value;

    if (editIndex !== null) {
      tasks[editIndex] = { name: taskName, desc: taskDesc, status: "pending" };
      editIndex = null;
    } else {
      tasks.push({ name: taskName, desc: taskDesc, status: "pending" });
    }

    document.getElementById("task-form").reset();
    displayTasks();
  });

function displayTasks() {
  let pendingList = document.getElementById("pending-list");
  let completedList = document.getElementById("completed-list");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(function (task, index) {
    let taskItem = document.createElement("li");
    taskItem.className = "task";
    taskItem.innerHTML = `${task.name} - ${task.desc}
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
      <button onclick="toggleTaskStatus(${index})">${
      task.status === "pending" ? "Complete" : "Pending"
    }</button>`;

    if (task.status === "pending") {
      pendingList.appendChild(taskItem);
    } else {
      completedList.appendChild(taskItem);
    }
  });

  updateProgress();
}

function editTask(index) {
  document.getElementById("task-name").value = tasks[index].name;
  document.getElementById("task-desc").value = tasks[index].desc;
  editIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function toggleTaskStatus(index) {
  tasks[index].status =
    tasks[index].status === "pending" ? "completed" : "pending";
  displayTasks();
}

function updateProgress() {
  let completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  let totalTasks = tasks.length;
  let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  document.getElementById("progress").value = progress;
}

function setUserName() {
  let userName = document.getElementById("name").value;
  if (userName) {
    document.querySelector("h1").textContent = `${userName}'s Task Management`;
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  let themeBtn = document.getElementById("theme-btn");
  themeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
}
