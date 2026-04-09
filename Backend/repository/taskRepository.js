const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/tasks.json');

const taskRepository = {
    readAll: () => {
        if (!fs.existsSync(filePath)) return [];
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data || '[]');
    },
    save: (tasks) => {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    }
};

module.exports = taskRepository;