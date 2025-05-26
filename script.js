const textInput = document.getElementById('textInput');
const taskplace = document.getElementById('taskplace');
let tasks=[];

textInput.addEventListener('keydown', function(e){
    if (e.key === 'Enter'){
        tasks.push(textInput.value);
        addtask(textInput.value);
        textInput.value = '';
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

function addtask(texts) {
    let task = document.createElement('div');
    taskplace.appendChild(task);
    task.setAttribute('class', 'task');
    let first = document.createElement('div');
    first.style.display = 'flex';
    task.appendChild(first);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    first.appendChild(checkbox);
    task.style.display = 'flex';
    let text = document.createElement('p');
    text.setAttribute('class', 'text');
    text.innerText = texts;
    first.appendChild(text);
    let del = document.createElement('button');
    del.innerText='delete';
    del.setAttribute('class', 'delete');
    task.appendChild(del);
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            text.style.textDecoration = 'line-through';
        }
        else {
            text.style.textDecoration = 'none';
        }
    });
    del.addEventListener('click', function(){
        taskplace.removeChild(task);
        tasks = tasks.filter(function(taskText) {
            return taskText !== texts;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }) 
}

window.onload = function() {
   const taskssaved =  JSON.parse(localStorage.getItem('tasks'));
   tasks = taskssaved || [];
   tasks.forEach(function(task){
        addtask(task);
   })
}