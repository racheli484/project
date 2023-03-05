const DOM = {
    taskBody: null,
    task: null,
    date: null,
    time: null,

}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function init() {

    DOM.task = document.querySelector("#tasks");
    DOM.date = document.querySelector("#date");
    DOM.time = document.querySelector("#time");
    DOM.taskBody = document.querySelector("#allTask")

    const resetButton = document.querySelector("#resetTask");
    resetButton.addEventListener("click", resetLocalStorageFn);

    draw(tasks);
}

function saveNewTaskFn() {

    if (!DOM.task.validity.valid || !DOM.date.validity.valid || !DOM.time.validity.valid) {
        alert('failed!')
        return;
    }

    tasks.push(new Task(DOM.task.value, DOM.date.value, DOM.time.value));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    draw(tasks);
    console.log(tasks);

    clearForm();
}

function clearForm() {
    DOM.task.value = "";
    DOM.date.value = "";
    DOM.time.value = "";

}
function resetTaskFn() {
    DOM.taskBody.innerHTML = "";

}
function resetLocalStorageFn() {
    DOM.taskBody.innerHTML = "";
    localStorage.removeItem("tasks");
    tasks = [];

}

function draw(tasksArray) {
    if (Array.isArray(tasksArray) === false) return;

    resetTaskFn();

    for (let index = 0; index < tasksArray.length; index++) {
        const currentTask = tasksArray[index];

        const spanRow = document.createElement("span");
        spanRow.className = "container-page"

        const divTask = document.createElement("div");
        divTask.innerText = currentTask.task;
        divTask.className = "divTask"

        const divDate = document.createElement("div");
        divDate.innerText = currentTask.date;

        const divTime = document.createElement("div");
        divTime.innerText = currentTask.time;

        const divActions = document.createElement("div");
        const divConstainderDate = document.createElement("div");
        divConstainderDate.append(divDate, divTime)
        divConstainderDate.className = 'divConstainderDate'
        const buttonDelete = document.createElement("i");
        // buttonDelete.classList.add("btn", "btn-danger");
        buttonDelete.className = "bi bi-file-earmark-x";
        divActions.append(buttonDelete);
        divActions.className = 'divActions';

        spanRow.onmouseover = function () {
            divActions.style.visibility = 'visible';
        }

        spanRow.onmouseleave = function () {
            divActions.style.visibility = 'hidden';
        }

        buttonDelete.addEventListener("click", function () {
            tasks.splice(index, 1);
            draw(tasks);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        spanRow.append(divActions, divTask, divConstainderDate);
        DOM.taskBody.append(spanRow);
    }
}

init()
