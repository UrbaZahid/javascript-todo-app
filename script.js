let NewTask = document.querySelector(".NewTask")
NewTask.addEventListener("click", function () {
    let overlay = document.querySelector(".overlay")
    overlay.style.display = "flex"
    overlay.querySelector(".addTask #addTask-heading h3").innerHTML = "Add new task";
    overlay.querySelector(".addTask form button").innerHTML = "Add Task"
    taskInput.value = ""
    dateInput.value = ""
    Edittask = null;
})
let CloseAddTask = document.querySelector(".closepopup")
CloseAddTask.addEventListener("click", function () {
    document.querySelector(".overlay").style.display = "none"

})

let taskInput = document.getElementById("taskInput")
let dateInput = document.getElementById("dateInput")

let taskList = document.querySelector(".taskList")
let Edittask = null;
let EditObj={}
let tasks = (JSON.parse(localStorage.getItem("tasks_array"))) || []
tasks.forEach(element => {
    taskCreation(element)
});
//function for task Creation
function taskCreation(task_obj){
    //add task into task List 
     let CompletedTasks = document.querySelector(".CompletedTasks")
            let task = document.createElement("div")
            task.classList.add("task")
            task.innerHTML = `
                <input type="checkbox" class="markasCompleted">
                 <div class="taskValues">
                    <p>${task_obj.title}</p>
                    <p>due date:${task_obj.date}</p>
                </div>
                <div class="EditIcon">
                <i data-lucide="pencil" ></i>
                </div>
                <div class="DeleteIcon">
                <i data-lucide="trash" ></i>
                </div>`
            
            let markasCompleted = task.querySelector(".markasCompleted")
            if(task_obj.completed){
                markasCompleted.checked=true;
                CompletedTasks.appendChild(task)
                let taskText = task.querySelectorAll(".taskValues p");
                taskText[1].classList.add("completed")
            }
            else{
                taskList.appendChild(task)
            }
            lucide.createIcons();

            //mark task as completed or uncompleted
            markasCompleted.addEventListener("change", function () {
                if (markasCompleted.checked ) {
                    task_obj.completed=true;
                    CompletedTasks.appendChild(task)
                    let taskText = task.querySelectorAll(".taskValues p");
                    taskText[1].classList.add("completed")
                }
                if (!markasCompleted.checked) {
                    task_obj.completed=false;
                    taskList.appendChild(task)
                    let taskText = task.querySelectorAll(".taskValues p");
                    taskText[1].classList.remove("completed")
                }
                localStorage.setItem("tasks_array", JSON.stringify(tasks))
            })

            //Delete task
            task.querySelector(".DeleteIcon").addEventListener("click", function () {
                let index=tasks.indexOf(task_obj)
                tasks.splice(index,1)
                localStorage.setItem("tasks_array", JSON.stringify(tasks))
                task.remove()
            })

            //Edit task
            task.querySelector(".EditIcon").addEventListener("click", function () {
                Edittask = task;
                EditObj=task_obj;
                let overlay = document.querySelector(".overlay");
                overlay.style.display = "flex";
                overlay.querySelector(".addTask #addTask-heading h3").innerHTML = "Edit Task";
                overlay.querySelector(".addTask form button").innerHTML = "Save Changes";
                //taking values of task input and date from its <p> tag
                let taskText = task.querySelectorAll(".taskValues p");
                taskInput.value = taskText[0].innerHTML
                dateInput.value = taskText[1].innerHTML.split(":")[1]
            })
}
let form = document.querySelector("form")
form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (Edittask == null) {
        //object creation for local storage saving
        let task_obj = {
            title: taskInput.value,
            date: dateInput.value,
            completed: false
        }
        tasks.push(task_obj)
        localStorage.setItem("tasks_array", JSON.stringify(tasks));
        taskCreation(task_obj)
    }
    else {
        let TaskText = Edittask.querySelectorAll(".taskValues p");
        let index=tasks.indexOf(EditObj)
        tasks[index].title=taskInput.value;
        tasks[index].date=dateInput.value;
        localStorage.setItem("tasks_array", JSON.stringify(tasks));
        TaskText[0].innerHTML = taskInput.value;
        TaskText[1].innerHTML = `due date:${dateInput.value}`;
        Edittask = null;
        EditObj = {};
    }
    
    document.querySelector(".overlay").style.display = "none";
    taskInput.value = ""
    dateInput.value = ""
})