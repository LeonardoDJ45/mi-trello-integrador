const fs = require('fs');
const path = './data/tasks.json';

const taskRepository = {
    readAll: () => {
        if (!fs.existsSync(path)) fs.writeFileSync(path, '[]');
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    },
    save: (tasks) => {
        fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
    }
};

module.exports = taskRepository;