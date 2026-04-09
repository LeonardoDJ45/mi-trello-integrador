const repository = require('../repository/taskRepository');

const taskService = {
    getAll: () => repository.readAll(),

    createTask: (title) => {
        if (!title) throw new Error("El título es obligatorio");
        const tasks = repository.readAll();
        const newTask = { id: Date.now(), title, status: 'todo' };
        tasks.push(newTask);
        repository.save(tasks);
        return newTask;
    },

    updateStatus: (id, newStatus) => {
        const tasks = repository.readAll();
        const index = tasks.findIndex(t => t.id === Number(id));
        if (index === -1) throw new Error("Tarea no encontrada");
        
        tasks[index].status = newStatus;
        repository.save(tasks);
        return tasks[index];
    },

    updateTitle: (id, newTitle) => {
        const tasks = repository.readAll();
        const index = tasks.findIndex(t => t.id === Number(id));
        if (index === -1) throw new Error("Tarea no encontrada");
        if (!newTitle) throw new Error("El título no puede estar vacío");

        tasks[index].title = newTitle;
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