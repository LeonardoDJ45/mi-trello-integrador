const express = require('express');
const cors = require('cors');
const taskController = require('./controllers/taskController');

const app = express();
app.use(cors());
app.use(express.json());

// Definición de Endpoints
app.get('/tasks', taskController.getAll);
app.post('/tasks', taskController.create);
app.put('/tasks/:id', taskController.updateStatus);
app.delete('/tasks/:id', taskController.delete);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));