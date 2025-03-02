inputTask = document.getElementById("task-input")
incomplete_tasks = document.getElementById("incomplete-tasks")
completed_tasks = document.getElementById("completed-tasks")
taskAddBtn = document.getElementById("task-add")
clearBtn = document.getElementById("tasks-clear")
incomplete_tasks_list = []
completed_tasks_list = []

incomplete_tasks_list_LS = JSON.parse(localStorage.getItem('incomplete_tasks_list'))
completed_tasks_list_LS = JSON.parse(localStorage.getItem('completed_tasks_list'))

if (incomplete_tasks_list_LS) {
    incomplete_tasks_list = incomplete_tasks_list_LS
}
if (completed_tasks_list_LS) {
    completed_tasks_list = completed_tasks_list_LS
}
render(incomplete_tasks_list, completed_tasks_list)

taskAddBtn.addEventListener("click", function() {
    newTask = inputTask.value
    if (newTask) {
        incomplete_tasks_list.push(inputTask.value)
        console.log(`New Task Added: ${inputTask.value}`)//inputTask.innerText)
        
        //incomplete_tasks.innerHTML += `<li>${inputTask.value}</li>`
        inputTask.value = ''
        render(incomplete_tasks_list, completed_tasks_list)
        localStorage.setItem('incomplete_tasks_list', JSON.stringify(incomplete_tasks_list))
    }
})

inputTask.addEventListener("keyup", function(e) {
    newTask = inputTask.value
    e.preventDefault()
    if (e.keyCode === 13) {
        taskAddBtn.click()
    }
})

clearBtn.addEventListener("click", function() {
    incomplete_tasks_list = []
    completed_tasks_list = []
    inputTask.value = ''
    localStorage.clear()
    render(incomplete_tasks_list, completed_tasks_list)
})


incomplete_tasks.addEventListener("click", function(e) {
    incomplete_tasks_list = incomplete_tasks_list.filter(item => item!=e.target.innerText) 
    completed_tasks_list.push(e.target.innerText)
    console.log(`Finished Task: ${e.target.innerText}`)
    render(incomplete_tasks_list, completed_tasks_list)
    localStorage.setItem('completed_tasks_list', JSON.stringify(completed_tasks_list))
    localStorage.setItem('incomplete_tasks_list', JSON.stringify(incomplete_tasks_list))
})

function render(incomplete_list, completed_list) {
    incomplete_tasks_items = ''
    completed_tasks_items= ''
    for (i=0;i<incomplete_list.length;i++) {
        incomplete_tasks_items+=`<li>${incomplete_list[i]}</li>`
    }
    for (i=0;i<completed_list.length;i++) {
        completed_tasks_items+=`<li>${completed_list[i]}</li>`
    }
    incomplete_tasks.innerHTML = incomplete_tasks_items
    completed_tasks.innerHTML = completed_tasks_items

}