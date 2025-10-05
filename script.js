document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  const STORAGE_KEY = "tasks";
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((item) => {
      tasks.push(taskText);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    console.log("Tasks saved to Local Storage.");
  }

  function createListItem(taskText) {
    const listItem = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    removeBtn.onclick = function () {
      listItem.remove();
      saveTasks();
    };

    listItem.appendChild(removeBtn);
    return listItem;
  }

  function loadTasks() {
    const saveTasks = localStorage.getItem(STORAGE_KEY);
    if (saveTasks) {
      const tasks = JSON.parse(saveTasks);
      tasks.forEach((taskText) => {
        const listItem = createListItem(taskText);
        taskList.appendChild(listItem);
      });
      console.log(`${tasks.length} tasks loaded from Local Storage.`);
    }
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.onclick = function () {
        taskList.removeChild(listItem);
      };
      listItem.appendChild(removeBtn);
      taskList.appendChild(listItem);
      taskInput.value = "";
    } else {
      alert("Please enter a task.");
    }
  }
  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  addTask();
});
