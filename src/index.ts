import {v4 as uuidV4} from "uuid"

type Task =  {
  id: string
  title:string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list')

const form = document.getElementById('new-task-form') as HTMLFormElement | null

const input = document.querySelector<HTMLInputElement>('#new-task-title')
const clear = document.querySelector<HTMLButtonElement>('#clear-all')
const remove = document.querySelector<HTMLButtonElement>('#remove-item')

const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
 e.preventDefault()

  if ( input?.value == "" || input?.value == null) return

  const newTask:Task = {
    id: uuidV4(),
    title: input.value,
    completed:false,
    createdAt:new Date()
  }
  tasks.push(newTask)

  addListItem(newTask)
 

input.value = ''

})
function addListItem(task:Task){
const item = document.createElement('li')

const checkbox = document.createElement('input')
const button = document.createElement('button')
button.setAttribute('id', 'remove-item')
item.setAttribute('id', 'task-not-complete')

button.innerHTML = 'X'


checkbox.type = 'checkbox'

checkbox.addEventListener('change', () => {
  task.completed = checkbox.checked
  item.setAttribute('id', 'complete')
  // item.setAttribute('id', {task.completed ? 'complete': 'task-not-complete'})

 
 saveTasks()
  
})

// checkbox.checked = task.completed



item.append(checkbox, task.title, button)
list?.append(item)
 
}


function saveTasks(){
  localStorage.setItem("task", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem("task")
 if (taskJSON == null) return []

 return JSON.parse(taskJSON)
}

remove?.addEventListener('click', () => {
     localStorage.removeItem('task')
     console.log('remove this item only');
     
})

clear?.addEventListener('click', ()=> {
  localStorage.clear()
  
})