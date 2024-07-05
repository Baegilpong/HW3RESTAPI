const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    tasks = tasks.map(task => task.id === id ? updatedTask : task);
    res.json(updatedTask);
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${port}`);
});