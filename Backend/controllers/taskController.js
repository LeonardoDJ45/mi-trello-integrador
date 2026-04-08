const taskService = require('../services/taskService');

const taskController = {
    // 1. Obtener todas las tareas
    getAll: (req, res) => {
        try {
            const tasks = taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener tareas" });
        }
    },

    // 2. Crear una tarea
    create: (req, res) => {
        try {
            const { title } = req.body;
            const newTask = taskService.createTask(title);
            res.status(201).json(newTask);
        } catch (error) {
            // El error 400 es porque el Service detectó un problema (ej. duplicado)
            res.status(400).json({ message: error.message });
        }
    },

    // 3. Actualizar estado (El que usamos para el Drag & Drop)
    updateStatus: (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedTask = taskService.updateTaskStatus(id, status);
            res.json(updatedTask);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // 4. Eliminar (Para completar el CRUD)
    delete: (req, res) => {
        try {
            const { id } = req.params;
            taskService.deleteTask(id);
            res.status(204).send(); // 204 significa "Éxito, pero no hay contenido que devolver"
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};

module.exports = taskController;