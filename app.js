const apiUrl = 'http://localhost:3000/tasks';

async function getTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  renderTasks(tasks);
}

async function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value;
  if (!taskText) return;

  const task = {
    id: Date.now(),
    text: taskText
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  if (response.ok) {
    taskInput.value = '';
    getTasks();
  }
}

async function deleteTask(taskId) {
  const response = await fetch(`${apiUrl}/${taskId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    getTasks();
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

getTasks();
