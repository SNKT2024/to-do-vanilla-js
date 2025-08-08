// DOM
const taskInput = document.getElementById("task-input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");

const addTask = function (newTask) {
  let userTask = JSON.parse(localStorage.getItem("task_list")) || [];
  userTask.push(newTask);
  localStorage.setItem("task_list", JSON.stringify(userTask));
  displayTasks();
};

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    taskInput.value = "";
  }
});

function deleteTask(index) {
  let userTask = JSON.parse(localStorage.getItem("task_list")) || [];
  userTask.splice(index, 1);
  localStorage.setItem("task_list", JSON.stringify(userTask));
  displayTasks();
}

const displayTasks = function () {
  let html = ``;
  try {
    let userTask = JSON.parse(localStorage.getItem("task_list"));
    if (!userTask || userTask.length === 0) {
      html = `<div style="text-align: center">
                <h3>NO TASK FOUND</h3>
                <span>Add Some Tasks</span>
              </div>`;
      taskList.innerHTML = html;
      return;
    }

    userTask.forEach((task, index) => {
      html += `<li class="task-item">
                <span class="task-text">${task}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
              </li>`;
    });
    taskList.innerHTML = html;

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteTask(index);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("load", displayTasks);
