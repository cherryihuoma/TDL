//const { createElement } = require("react");

const addBtn = document.getElementById("addBtn");
const myTask = document.getElementById("myTask");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click",() => {
    taskList.innerHTML = "";

    localStorage.removeItem("tasks");
});

window.addEventListener("load", loadTasks);
addBtn.addEventListener("click", addTask);

function addTask(){
    const taskText = myTask.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);

    saveTask(taskText);

    myTask.value = "";
}

function createTaskElement(taskText){
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () =>{
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(taskText){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({text: taskText, completed:false});
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if(task.completed){
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            updateLocalStorage();
        });

        const deleteBtn =document.createElement("button");
        deleteBtn.textContent = "❌"
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    })

    function updateLocalStorage(){
        let tasks = [];
        document.querySelectorAll("taskList li").forEach(li => {
            tasks.push({
                text: li.childNodes[0].textContent,completed:
                li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
}
/*addBtn.addEventListener("click", () => {
    const taskText = myTask.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () =>{
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    myTask.value = "";
})*/