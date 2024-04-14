document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'task-item');
        li.textContent = taskValue;

        // Set up a click event for each task to select it
        li.addEventListener('click', function() {
            this.classList.toggle('selected');
        });

        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';  // Clear input field after adding
    }
}

document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        let now = new Date();
        li.dataset.timestamp = now.getTime();

        li.textContent = taskValue + " - ajouté " + formatDuration(now);

        document.getElementById('taskList').appendChild(li);
        taskInput.value = ''; // Clear input field after adding

        updateDurations();
    }
}

function formatDuration(date) {
    let now = new Date();
    let diff = (now - date) / 1000; // difference in seconds
    if (diff < 60) {
        return 'à l\'instant';
    } else if (diff < 3600) {
        return `il y a ${Math.floor(diff / 60)} min`;
    } else if (diff < 86400) {
        return `il y a ${Math.floor(diff / 3600)} h`;
    } else if (diff < 604800) {
        return `il y a ${Math.floor(diff / 86400)} j`;
    } else {
        return date.toLocaleDateString("fr-FR"); // Return the full date after a week
    }
}

function updateDurations() {
    let tasks = document.querySelectorAll('.list-group-item');
    tasks.forEach(task => {
        let timestamp = parseInt(task.dataset.timestamp);
        let date = new Date(timestamp);
        let text = task.textContent.split(" - ajouté ")[0];
        task.textContent = text + " - ajouté " + formatDuration(date);
    });
}

// Update task durations every minute
setInterval(updateDurations, 60000);
//télécharger des tâches en Format {log.txt}

function downloadTasks() {
    var taskListElement = document.getElementById('taskList');
    var tasks = taskListElement.querySelectorAll('li');
    var taskData = [];

    tasks.forEach(function(task) {
        taskData.push(task.textContent.trim());
    });

    var data = taskData.join('\n');
    var filename = "logs.txt";
    var file = new Blob([data], {type: 'text/plain'});

    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}
