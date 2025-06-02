const taskInput = document.querySelector(".task-input input"),
    taskBox = document.querySelector(".task-box"),
    filters = document.querySelectorAll(".filters span"),
    tooltipTxt = document.querySelector(".tooltipTxt"),
clearAll = document.querySelector(".clear-btn");
// declaring constents values

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

// declaring non-constents values 

setInterval(() => {
tooltipTxt.parentElement.style.display = "none";
}, 15000);

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
})


// SettingUp The filters btn functionality 
function showTodo(filters) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "Completed" ? "checked" : "";
            if (filters == todo.status || filters == "all") {
                li += ` <li class="task">
                <label for="${id}">
                  <input onclick="updateStatus(this)" type="checkbox" name="" id="${id}" ${isCompleted}>
                  <p class="${isCompleted}">${todo.name}</p>
              </label>
              <div class="settings">
                 <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                 <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                 <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
               </ul>
              </div>
          </li>`
            }
        });
    }                                                       // Showing Todos and appending li to the taskBox
    taskBox.innerHTML = li || `<span>You don't have any task here</span>`; // if taskbox has no li ten display this text
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");


function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })
}

// Showing Menu on clicking the button (3dots) 
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "Completed";
    }
    else {
        taskName.classList.remove("checked")
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Updating Staus in localStorage
function editTask(taskId, textName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}
// SettingUp the edit functionality                                                        
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}
// SettingUp the Deleted functionality
clearAll.addEventListener("click", () => {
    isEditedTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});


//  SettingUp the clearBtn functionality
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter") {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }

            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        }
        else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }

        taskInput.blur();
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});
taskInput.addEventListener("blur", () => taskInput.classList.remove("active"));
                                                            // making main functionality for TaskINput















































