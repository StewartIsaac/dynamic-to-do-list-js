// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function for adding new tasks to the list
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Alert if task input is empty
        if (taskText === "") {
            alert("Enter a task");
            return;
        }

        // Create a new li element and set its textContent to taskText
        let li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button for removing the task
        let removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';

        // Assign an onclick event to the remove button to remove the li element from taskList
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            // Update tasks in Local Storage when removing
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the li element
        li.appendChild(removeBtn);

        // Append the li element to the taskList
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";

        // Save the task to Local Storage if save is true
        if (save) {
            updateTasksInLocalStorage(taskText);
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const tasksFromStorage = localStorage.getItem('tasks');
        
        if (tasksFromStorage !== null) {
            const parsedTasks = JSON.parse(tasksFromStorage);

            // Loop through tasks and add them to the list
            parsedTasks.forEach(task => addTask(task, false)); // 'false' indicates not to save again to Local Storage
        }
    }

    // Function to update tasks in Local Storage
    function updateTasksInLocalStorage(newTask = "") {
        // Get existing tasks from Local Storage (or initialize an empty array)
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add new task to the tasks array
        if (newTask) {
            tasks.push(newTask);
        }

        // Save updated tasks array to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        // Get existing tasks from Local Storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Filter out the task to be removed
        tasks = tasks.filter(task => task !== taskText);

        // Save updated tasks array to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add an event listener to addButton to call addTask
    addButton.addEventListener('click', () => addTask());

    // Add an event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the “Enter” key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
