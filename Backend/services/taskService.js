const repository = require('../repository/taskRepository');

const taskService = {
    getAllTasks: () => repository.readAll(),

    createTask: (title) => {
        if (!title || title.trim() === "") throw new Error("El título es requerido");
        
        const tasks = repository.readAll();
        if (tasks.find(t => t.title.toLowerCase() === title.toLowerCase())) {
            throw new Error("La tarea ya existe");
        }

        const newTask = { id: Date.now(), title: title.trim(), status: 'todo' };
        tasks.push(newTask);
        repository.save(tasks);
        return newTask;
    },

    updateTaskStatus: (id, newStatus) => {
        const tasks = repository.readAll();
        const index = tasks.findIndex(t => t.id === Number(id));
        
        if (index === -1) throw new Error("Tarea no encontrada");
        
        const validStatuses = ['todo', 'doing', 'done'];
        if (!validStatuses.includes(newStatus)) throw new Error("Estado inválido");

        tasks[index].status = newStatus;
        repository.save(tasks);
        return tasks[index];
    },

    deleteTask: (id) => {
        let tasks = repository.readAll();
        tasks = tasks.filter(t => t.id !== Number(id));
        repository.save(tasks);
    }
};

module.exports = taskService;