const taskService = require('../services/taskService');

const taskController = {
    getAll: (req, res) => {
        const tasks = taskService.getAll();
        res.json(tasks);
    },

    create: (req, res) => {
        try {
            const { title } = req.body; 
            
            const task = taskService.createTask(title); 
            res.status(201).json(task);
        } catch (e) { 
            res.status(400).json({ error: e.message }); 
        }
    },

    updateStatus: (req, res) => {
        try {
            const { status } = req.body;
            const { id } = req.params;
            const task = taskService.updateStatus(id, status);
            res.json(task);
        } catch (e) { 
            res.status(400).json({ error: e.message }); 
        }
    },

    updateTitle: (req, res) => {
        try {
            const { title } = req.body;
            const { id } = req.params;
            const task = taskService.updateTitle(id, title);
            res.json(task);
        } catch (e) { 
            res.status(400).json({ error: e.message }); 
        }
    },

    delete: (req, res) => {
        try {
            taskService.deleteTask(req.params.id);
            res.status(204).send();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
};

module.exports = taskController;