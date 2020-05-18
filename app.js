//Add task
const form = document.querySelector('#form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearButton =document.querySelector('.clearBtn');
const filter= document.querySelector('#filter');


loadAllEventlisteners();

function loadAllEventlisteners(){
  form.addEventListener('submit',addTask);
  filter.addEventListener('keyup',filterTask);
  document.addEventListener('DOMContentLoaded', showTask);
  taskList.addEventListener('click',removeTask);
  clearButton.addEventListener('click', clearTask);
}

//local Storage Function declARATION

function storeToLocalStorage(task){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//SHOW TASKS FROM LOCAL STORAGE
function showTask(e){
if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  taskList.appendChild(li);
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = "<i class ='fa fa-remove'></i>"
  li.appendChild(link);
  })
  
}

//remove from lOCAL STORAGE
function removeFromLocalStorage(task){
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(taskitem, index){
    if(task.textContent === taskitem){
      tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  })
}

//clear fromLs
 function clearFromLocalStorage(){
  localStorage.clear();
 }

//aDD TASK TO Ui

function addTask(e){
  if(taskInput.value === ""){
    alert("please add a task");
  }else{
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  taskList.appendChild(li);
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = "<i class ='fa fa-remove'></i>"
  li.appendChild(link);
  storeToLocalStorage(taskInput.value);
  taskInput.value = '';
  e.preventDefault();
  }
}

//REMOVE TASKS FROM UI
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
      e.target.parentElement.parentElement.remove();
  }
  removeFromLocalStorage( e.target.parentElement.parentElement);
}

//CLEAR TASK FROM UI
function clearTask(e){
    taskList.innerHTML = '';
    clearFromLocalStorage();
}

//filterTask
function filterTask(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !=-1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  })
}