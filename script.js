// Function to fetch tasks from local JSON
async function fetchTasks() {
    try {
      const response = await fetch('tasks.json');
      if (response.ok) {
        const tasks = await response.json();
        return tasks;
      } else {
        console.error('Failed to fetch tasks:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }
  
  // Function to get tasks and render them
  async function getTasks() {
    const tasks = await fetchTasks();
    renderTasks(tasks);
  }
  
  // Function to add a new task
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    if (!taskText) return;
  
    const task = {
      id: Date.now(),
      text: taskText
    };
  
    // Simulating adding task to local JSON by adding to DOM
    taskInput.value = '';
    renderTasks([...tasks, task]);
  }
  
  // Function to delete a task
  function deleteTask(taskId) {
    // Simulating deleting task from local JSON by removing from DOM
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks(tasks);
  }
  
  // Function to render tasks
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
  
  // Initial fetching and rendering of tasks
  let tasks = [];
  getTasks();
  