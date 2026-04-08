// Importa las librerías necesarias
const express = require('express'); // Framework para crear el servidor
const cors = require('cors'); // Permite conexiones entre diferentes orígenes
const taskController = require('./controllers/taskController'); // Controlador de tareas

// Inicializa la aplicación
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite recibir datos en formato JSON

// Obtener todas las tareas
app.get('/tasks', taskController.getAll);

// Crear una nueva tarea
app.post('/tasks', taskController.create);

// Actualizar el estado de una tarea por ID
app.put('/tasks/:id', taskController.updateStatus);

// Eliminar una tarea por ID
app.delete('/tasks/:id', taskController.delete);

// Puerto del servidor
const PORT = 3000;

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
