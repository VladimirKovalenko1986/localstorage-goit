import { save, load } from "./storage.js";

const myInput = document.getElementById("myInput");
// Константа id яка додається до кожного Лі
let currentId = 0;
// Контанта ключа для стораджа
const STORAGE_KEY = "tasks";

function addNewTask() {
    const inputValue = myInput.value.trim();
    if (inputValue === "") {
        alert("You mast write something!");
        return;
    }
    createLi(inputValue);

    // Після додавання очищаємо поле вводу
    myInput.value = "";

    // Додаємо функцію яка буде додавати Лі у сторедж
    addTaskToStoradge(inputValue);
}

function createLi(text, isDone = false, id = currentId) {
    const liEl = document.createElement("li");

    // Варіант 1
    const liText = document.createTextNode(text);
    liEl.appendChild(liText);
    // Варіант 2
    // liEl.textContent = text;

    // Додамо до елементу поле з id
    liEl.dataset.id = id;

    // Робимо перевірку якщо isDone = true, то запис вже буде додана с класом checked
    if (isDone) {
        liEl.className = "checked";
    }

    myUL.appendChild(liEl);
    addCloseBtn(liEl);
}

// Додаємо функцію крестику
function addCloseBtn(li) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}

// При натисканні на Лі додаємо класс
function handleTaskBehaviour({ target }) {
    const currentState = load(STORAGE_KEY);

    if (target.tagName === "LI") {
        target.classList.toggle("checked");

        //Збережемо індекс елементу масиву який нам потрібен
        const taskIndex = currentState.findIndex(
            (taskObj) => +taskObj.id === +target.dataset.id
        );

        // Міняємо значення isDone
        currentState[taskIndex].isDone = !currentState[taskIndex].isDone;

        // Робимо перевірку для відалення елементу
    } else if (target.classList.contains("close")) {
        target.parentNode.remove();

        // Робимо видалення елементу
        const taskIndex = currentState.findIndex(
            (taskObj) => +taskObj.id === +target.parentNode.dataset.id
        );

        currentState.splice(taskIndex, 1);
    }
    save(STORAGE_KEY, currentState);
}

// Створює об'єкт нашої задачі в томи вигляді що нам потрібна
const createTaskObject = (text, isDone) => ({ text, isDone, id: currentId });

// функція яка буде додавати Лі у сторедж
function addTaskToStoradge(text, isDone = false) {
    // Зробимо перевірку що там є
    const currentState = load(STORAGE_KEY);
    const newTask = createTaskObject(text, isDone);
    if (currentState === undefined) {
        save(STORAGE_KEY, [newTask]);
    } else {
        currentState.push(newTask);
        save(STORAGE_KEY, currentState);
    }

    // Оновлюємо ID
    currentId += 1;
}

// Функція яка буде діставати дані зі стореджа і буде додавати дані у вигляді Лі на сторінку
function fillTasksList() {
    const currentState = load(STORAGE_KEY);
    if (currentState !== undefined) {
        currentState.forEach(({ text, isDone, id }) =>
            createLi(text, isDone, id)
        );

        // Робимо щоб id при а новлені не створювався з початку
        currentId = currentState[currentState.length - 1].id + 1;
    }
}

export { addNewTask, handleTaskBehaviour, fillTasksList };
