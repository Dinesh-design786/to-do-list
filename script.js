// script.js
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const priorityInput = document.getElementById('priority-input');
  const dueDateInput = document.getElementById('due-date-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const sortByPriorityBtn = document.getElementById('sort-by-priority');
  const sortByDateBtn = document.getElementById('sort-by-date');

  let tasks = [];

  // Add Task
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (taskText) {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: priority,
        dueDate: dueDate || new Date().toISOString().split('T')[0] // Default to today if no date is selected
      };
      tasks.push(task);
      renderTasks();
      taskInput.value = '';
      dueDateInput.value = ''; // Reset due date input
    }
  });

  // Render Tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      if (task.completed) {
        taskItem.classList.add('completed');
      }
      taskItem.innerHTML = `
        <span>${task.text} (Priority: ${task.priority}, Due: ${task.dueDate})</span>
        <div class="task-actions">
          <button onclick="toggleComplete(${task.id})">✔️</button>
          <button onclick="editTask(${task.id})">✏️</button>
          <button onclick="deleteTask(${task.id})">❌</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }

  // Toggle Complete
  window.toggleComplete = (id) => {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
  };

  // Edit Task
  window.editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit your task:', task.text);
    if (newText) {
      tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
      renderTasks();
    }
  };

  // Delete Task
  window.deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  };

  // Sort by Priority
  sortByPriorityBtn.addEventListener('click', () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks();
  });

  // Sort by Due Date
  sortByDateBtn.addEventListener('click', () => {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    renderTasks();
  });
});