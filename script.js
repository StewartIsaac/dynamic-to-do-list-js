// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn'); // Change to addButton
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // function for adding new tasks to the list
    function addTask() {
      let taskText = taskInput.value.trim();
  
      // alert if task input is empty
      if (taskText === "") {
        alert("Enter a task");
      } else {
  
        // Create a new li element and set its textContent to taskText
        let li = document.createElement('li');
        li.textContent = taskText;
  
        // create a new button for removing the task
        let removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';

        // Use classList.add to add the class name
        removeBtn.classList.add('remove-btn');
  
        // Assign an onclick event to the remove button to 
        // remove the li element from taskList
        removeBtn.onclick = () => {
          taskList.removeChild(li);
        };
  
        // Append the remove button to the li element
        taskList.appendChild(li);
  
        // Clear the task input field
        taskInput.value = "";
      }
    }
  
    // Add an event listener to addButton to call addTask
    addButton.addEventListener('click', addTask);
  
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter'){
        addTask();
      }
    });
  });