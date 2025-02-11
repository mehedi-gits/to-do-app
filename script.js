
document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => addTask(task));
}

function userInput() {
    let uInput = document.getElementById("tasklist");
    let textInput = uInput.value.trim();

    if (textInput === "") return;

    let taskObj = {
        id : Date.now(),
        text : textInput
    }
    
    addTask(taskObj)

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    uInput.value = "";

}

function addTask(taskObj) {
    const ul = document.getElementById("ul");
    const div = document.createElement("div");
    div.classList.add("listcontainer");
    div.setAttribute("data-id", taskObj.id);

    const li = document.createElement("div");
    li.id = "list";
    li.innerHTML = `<div id="task">${taskObj.text}</div>`;

    const edt = document.createElement("span");
    edt.id = "edt";
    edt.innerHTML = `<i class="fa-regular fa-pen-to-square" onclick="modifyTask(this)"></i>`;

    const del = document.createElement("span");
    del.id = "del";
    del.innerHTML = `<i class="fa-regular fa-trash-can" onclick="deleteTask(this)"></i>`;

    div.appendChild(li);
    div.appendChild(edt);
    div.appendChild(del);
    ul.appendChild(div);
}


function modifyTask(element){
    let task = element.closest("div");
    let taskText = task.querySelector("#task");

    let updateTask = prompt("Modify the Task", taskText.innerText);

    if (updateTask === null || updateTask.trim() === "") {
        alert("Task can't be empty!");
        return;
    }

    taskText.innerText = updateTask;
        let taskId = element.closest(".listcontainer").getAttribute("data-id");
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let taskIndex = tasks.findIndex(task => task.id == taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = updateTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        else {

            prompt("No Data Found")

            } 
        }


function deleteTask(element) {
    let taskContainer = element.closest(".listcontainer");
    let taskId = taskContainer.getAttribute("data-id");
    taskContainer.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
