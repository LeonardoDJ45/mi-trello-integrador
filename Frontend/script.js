const API_URL = 'http://localhost:3000/tasks';

// Cargar tareas al iniciar
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    document.querySelectorAll('.kanban-column').forEach(col => col.innerHTML = '');
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.id = `task-${task.id}`;
    card.ondragstart = (e) => e.dataTransfer.setData("text", task.id);

    card.innerHTML = `
        <div>
            <strong>${task.title}</strong>
            <div class="mt-2">
                <button class="btn btn-sm btn-outline-primary" onclick="editTask(${task.id}, '${task.title}')">✏️</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        </div>
    `;
    document.getElementById(task.status).appendChild(card);
}

async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });
    input.value = '';
    loadTasks();
}

async function editTask(id, currentTitle) {
    const newTitle = prompt("Nuevo nombre:", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;
    await fetch(`${API_URL}/${id}/title`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
    });
    loadTasks();
}

async function deleteTask(id) {
    if (confirm("¿Borrar tarea?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadTasks();
    }
}

// Drag & Drop
function allowDrop(e) { e.preventDefault(); }

async function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const newStatus = e.target.closest('.kanban-column').id;
    
    await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
    loadTasks();
}

loadTasks();