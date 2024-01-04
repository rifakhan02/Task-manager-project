document.addEventListener('DOMContentLoaded', function () {
            fetchTasks();

            document.getElementById('taskForm').addEventListener('submit', function (event) {
                event.preventDefault();
                const taskInput = document.getElementById('taskInput').value;
                addTask(taskInput);
                document.getElementById('taskInput').value = '';
            });
        });

function addTask(task) {
    fetch('/add_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `task=${encodeURIComponent(task)}`,
    })
        .then(response => response.json())
        .then(data => {
            displayTasks(data.tasks);
        });
}

function deleteTask(task) {
    fetch('/delete_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `task=${encodeURIComponent(task)}`,
    })
        .then(response => response.json())
        .then(data => {
            displayTasks(data.tasks);
        });
}

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            displayTasks(data.tasks);
        });
    }

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            ${task}
            <button class="delete-btn" onclick="deleteTask('${task}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}