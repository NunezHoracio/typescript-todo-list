var taskTitle = document.getElementById("taskTitle");
var taskDescription = document.getElementById("taskDescription");
var taskAddBtn = document.getElementById("taskAddBtn");
var taskList = document.getElementById("taskList");
var tasks = [];
var addNewTask = function () {
    if (taskTitle instanceof HTMLInputElement && taskDescription instanceof HTMLTextAreaElement) {
        var title = taskTitle.value.trim();
        var description = taskDescription.value.trim();
        if (title !== '' && description !== '') {
            var newTask = {
                id: tasks.length,
                title: title,
                description: description,
                completed: false
            };
            tasks.push(newTask);
            taskTitle.value = '';
            taskDescription.value = '';
            renderTasks();
        }
    }
};
var deleteTask = function (task) {
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        renderTasks();
    }
};
var handleCheckBoxChange = function (task, checkBox) {
    checkBox.addEventListener("change", function () {
        task.completed = checkBox.checked;
        renderTasks();
    });
};
var renderTasks = function () {
    if (taskList instanceof HTMLDivElement) {
        taskList.innerHTML = '';
        tasks.map(function (task) {
            var taskItem = document.createElement('div');
            taskItem.classList.add('card', 'm-2', 'shadow', task.completed ? 'bg-dark-subtle' : 'text-bg-dark');
            taskItem.style.width = '200px';
            taskItem.style.height = 'auto';
            taskItem.innerHTML = "\n                <div class=\"card-body d-flex flex-column justify-content-between\">\n                    <div class=\"mb-3\">\n                        <div class=\"card-body-top mb-3 d-flex justify-content-between align-items-center\">\n                            <h5 class=\"card-title\">".concat(task.title, "</h5>\n                            <input class=\"form-check-input checkBox\" type=\"checkbox\" value=\"\" ").concat(task.completed ? 'checked' : '', ">\n                        </div>\n                        <p class=\"card-text\">").concat(task.description, "</p>\n                    </div>\n                    <div class=\"d-flex justify-content-center\">\n                        <button type=\"button\" class=\"btn btn-danger deleteButton\">Eliminar</button>\n                    </div>\n                </div>\n\n            ");
            var checkBox = taskItem.querySelector('.checkBox');
            var deleteButton = taskItem.querySelector('.deleteButton');
            if (checkBox instanceof HTMLInputElement) {
                handleCheckBoxChange(task, checkBox);
            }
            if (deleteButton instanceof HTMLButtonElement) {
                deleteButton.addEventListener("click", function () { return deleteTask(task); });
            }
            taskList.appendChild(taskItem);
        });
    }
};
if (taskAddBtn instanceof HTMLButtonElement) {
    taskAddBtn.addEventListener("click", addNewTask);
}
