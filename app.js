const express = require('express');
const app = express();
const tasks = require('/Users/Leye/Desktop/TP NODE JS/Database');

app.use(express.json()); 
// t pour ajouter une tâche
app.post('/todos', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// pour modifier une tâche par son id
app.put('/todos/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasks.forEach((task, index) => {
    if (task.id === parseInt(taskId)) {
      tasks[index] = updatedTask;
      res.json(updatedTask);
    }
  });
  res.status(404).send('Task not found');
});

//  pour afficher toutes les tâches
app.get('/todos', (req, res) => {
  res.json(tasks);
});

// Endpoint pour afficher les détails d'une tâche par son id
app.get('/todos/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Endpoint pour supprimer une tâche par son id
app.delete('/todos/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  res.sendStatus(204);
});

// Endpoint pour filtrer les tâches par titre (exemple: /todos?search=faire)
app.get('/todos', (req, res) => {
  const searchQuery = req.query.search;
  if (searchQuery) {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    res.json(filteredTasks);
  } else {
    res.json(tasks);
  }
});

// Endpoint pour trier les tâches par ordre de priorité
app.get('/todos/order', (req, res) => {
  const orderedTasks = tasks.sort((a, b) => a.priority - b.priority);
  res.json(orderedTasks);
});

// Endpoint par défaut pour les erreurs 404
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
