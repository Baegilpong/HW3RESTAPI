let tasks = JSON.parse(localStorage.getTask('tasks')) || [];

document.addEventListener('DOMContentLoaded', renderTasks);

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const newTaskName = newTaskInput.value.trim();

    if (newTaskName !== '') {
        const newTask = { id: Date.now().toString(), name: newTaskName };
        tasks.push(newTask);
        localStorage.setTask('tasks', JSON.stringify(tasks));
        newTaskInput.value = '';
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setTask('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}