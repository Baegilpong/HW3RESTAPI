let tasks = JSON.parse(localStorage.gettask('tasks')) || [];

document.addEventListener('DOMContentLoaded', rendertasks);

function addtasks() {
    const newtaskInput = document.getElementById('newTask');
    const newtaskName = newtaskInput.value.trim();

    if (newtaskName !== '') {
        const newtask = { id: Date.now().toString(), name: newtaskName };
        tasks.push(newtask);
        localStorage.settask('tasks', JSON.stringify(tasks));
        newtaskInput.value = '';
        rendertasks();
    }
}

function deletetask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.settask('tasks', JSON.stringify(tasks));
    rendertasks();
}

function rendertasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletetask(task.id);

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}