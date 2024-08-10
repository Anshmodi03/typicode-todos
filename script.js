const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Get todos from API and render them
fetch(apiUrl + '?_limit=10')
    .then(res => res.json())
    .then(data => data.forEach(renderTodo));

// Render a single todo
function renderTodo(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.textContent = todo.title;
    todoDiv.dataset.id = todo.id;
    if (todo.completed) {
        todoDiv.classList.add('done');
    }
    document.getElementById('todo-list').appendChild(todoDiv);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#todo-form').addEventListener('submit', addTodo);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
    document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
});

// Add a new todo
function addTodo(e) {
    e.preventDefault();
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false,
    };
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => renderTodo(data));
}

// Toggle completed status
function toggleCompleted(e) {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
        updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
}

// Update todo status
function updateTodo(id, completed) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Delete a todo
function deleteTodo(e) {
    if (e.target.classList.contains('todo')) {
        const id = e.target.dataset.id;
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => e.target.remove());
    }
}