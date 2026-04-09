const express = require('express');
const cors = require('cors');
const taskController = require('./controllers/taskController');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoints de la API REST
app.get('/tasks', taskController.getAll);
app.post('/tasks', taskController.create);
app.put('/tasks/:id/status', taskController.updateStatus);
app.patch('/tasks/:id/title', taskController.updateTitle);
app.delete('/tasks/:id', taskController.delete);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));