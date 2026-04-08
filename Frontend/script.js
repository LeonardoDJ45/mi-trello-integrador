const API_URL = "http://localhost:3000/tasks";

document.addEventListener("DOMContentLoaded", fetchTasks);

async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();
        renderTasks(tasks);
    } catch (err) {
        console.error("Error conectando al backend");
    }
}

function renderTasks(tasks) {
    const columns = {
        todo: document.getElementById('todo-list'),
        doing: document.getElementById('doing-list'),
        done: document.getElementById('done-list')
    };
    Object.values(columns).forEach(col => col.innerHTML = "");

    tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = 'card task-card p-2 mb-2 shadow-sm bg-white';
        taskEl.draggable = true;
        taskEl.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${task.title}</span>
                <button class="btn btn-sm text-danger" onclick="deleteTask(${task.id})">×</button>
            </div>
        `;
        
        taskEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("text/plain", task.id);
        });

        columns[task.status].appendChild(taskEl);
    });
}

async function addTask() {
    const input = document.getElementById('taskTitle');
    const title = input.value.trim();
    if (!title) return alert("Escribe un título");

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    if (res.ok) {
        input.value = "";
        fetchTasks();
    } else {
        const err = await res.json();
        alert(err.message);
    }
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

function allowDrop(e) { e.preventDefault(); }

async function drop(e, newStatus) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
    fetchTasks();
}