// const user = {
//     name: "Mango",
//     age: 2,
// };

// Метод который переводит к сторке обьект или массив обьектов
// console.log(JSON.stringify(user));

// const saveUserData = '{ "name":"Mango","age":2 }';

// Метод который переводит к обьекту или массиву обьектов сторку
// console.log(JSON.parse(saveUserData));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!++++++++++++++++++++++++++++++++++++++++++++++++++
// * LocalStorage

// Записываем в локальное хранилище
// localStorage.setItem("my-data", JSON.stringify(user));

// Считываем с локального хранилища
// const saveData = localStorage.getItem("my-data");
// console.log("🚀 ~ saveData", saveData);
// const parsedData = JSON.parse(saveData);
// console.log(parsedData);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!++++++++++++++++++++++++++++++++++++++++++++++++++
// * Форма

const refs = {
    form: document.querySelector(".js-feedback-form"),
    textarea: document.querySelector(".js-feedback-form textarea"),
};

const STORAGE_KEY = "feedback-msg";

refs.form.addEventListener("submit", onFormSubmit);
refs.textarea.addEventListener("input", onTextareaInput, 1000);

populateTextarea();

function onFormSubmit(e) {
    // Запрещаем перезагрузки странички
    e.preventDefault();

    console.log("Отпрвляем форму!");

    // После отправки сообщения очищаем форму
    e.currentTarget.reset();
    // Удаляем из локасторедж при отправке формы
    localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
    // Получаем значения которое вводим в инпут сообщения
    const message = e.target.value;

    // Записыввем в локал сторедж, добавляем троттл
    localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
    // Получаем значения из локал стореджа
    const saveMessage = localStorage.getItem(STORAGE_KEY);

    // Проверяем есть ли что нибуть уже в локалсторедж
    if (saveMessage) {
        console.log(saveMessage);

        // Обнавляем Дом
        refs.textarea.value = saveMessage;
    }
}
