const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskAddBtn = document.getElementById("taskAddBtn");
const taskList = document.getElementById("taskList");

type Task = {
    id: number,
    title: string,
    description: string,
    completed: boolean
}

const tasks: Task[] = [];

const addNewTask = () => {

    if (taskTitle instanceof HTMLInputElement && taskDescription instanceof HTMLTextAreaElement) {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();

        if (title !== '' && description !== '') {
            const newTask: Task = {
                id: tasks.length,
                title: title,
                description: description,
                completed: false
            }

            tasks.push(newTask);
            taskTitle.value = '';
            taskDescription.value = '';

            renderTasks();
        }
    }
}

const deleteTask = (task: Task) => {
    const index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

const handleCheckBoxChange = (task: Task, checkBox: HTMLInputElement) => {
    checkBox.addEventListener("change", () => {
        task.completed = checkBox.checked;
        renderTasks();
    });
}

const renderTasks = () => {
    if (taskList instanceof HTMLDivElement) {
        taskList.innerHTML = '';

        tasks.map(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('card', 'm-2', 'shadow', task.completed ? 'bg-dark-subtle' :  'text-bg-dark');
            taskItem.style.width = '200px';
            taskItem.style.height = 'auto';

            taskItem.innerHTML = `
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="mb-3">
                        <div class="card-body-top mb-3 d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${task.title}</h5>
                            <input class="form-check-input checkBox" type="checkbox" value="" ${task.completed ? 'checked' : ''}>
                        </div>
                        <p class="card-text">${task.description}</p>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-danger deleteButton">Eliminar</button>
                    </div>
                </div>

            `
            
            const checkBox = taskItem.querySelector('.checkBox');
            const deleteButton = taskItem.querySelector('.deleteButton')

            if(checkBox instanceof HTMLInputElement){
                handleCheckBoxChange(task, checkBox)
            }

            if (deleteButton instanceof HTMLButtonElement) {
                deleteButton.addEventListener("click", () => deleteTask(task));
            }

            taskList.appendChild(taskItem);
        });
    }
}

if (taskAddBtn instanceof HTMLButtonElement) {
    taskAddBtn.addEventListener("click", addNewTask)
}
