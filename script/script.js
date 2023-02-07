// * Метод try.....catch

// try {
//     const data = "hello";
//     console.log(JSON.parse(data));
// } catch (err) {
//     console.error(err.message);
// }

// console.log("Hello Word!");

// Смисл в тому що після помилкі ког нижче буде виконуватись

// for (let i = 0; i < 10; i++) {
//     try {
//         console.log(i);

//         if (i === 5) throw new Error("i is 5");
//     } catch (err) {
//         console.error(err.message);
//     }
// }

// console.log("hello word");

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// * Localstorega

// Записуємо

// const save = (key, value) => {
//     try {
//         const serializedData = JSON.stringify(value);
//         localStorage.setItem(key, serializedData);
//     } catch (err) {
//         console.error(err.mesage);
//     }
// };

// Зчитуємо

// const load = (key) => {
//     try {
//         const serializedData = localStorage.getItem(key);

// Робимо перевірку якщо не знайде ключ поверне undefined а в іншому разі буде null
//         return serializedData === null ? undefined : JSON.parse(serializedData);
//     } catch (err) {
//         console.error(err.message);
//     }
// };

// Функція remove

// const remove = (key) => {
//     try {
//         localStorage.removeItem(key);
//     } catch (err) {
//         console.error("Remove state error:", err.message);
//     }
// };

// const theme1 = {
//     current: "dark",
// };

// const theme = {
//     current: "light",
// };

// Додаємо
// save("theme", theme);
// save("theme-1", theme1);

// console.log(load("theme"));
// console.log(load("theme-1"));

// Видаляємо
// remove("theme-1");
// console.log(load("theme-1"));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// * Написати Todo-list де можно де можна створювати, видаляти елементи та реалізувати збереження в локал сторедж

//????????  - Без локального стореджа:

// 1. написати логіку додавання задачі по натисканню кнопки адд:
// а. зчитати значення з поля вводу
// б. робимо перевірку на пусту строку якщо вона пуста повідомляємо про це користувача і не додаємо задачу
// в. якщо задача є, створюємо пункт списку в якому додаємо ьекст задачі
// г. додаємо хрестик до пукту списку
// д. очистити поле вводу

// 2. Написати логіку стану задачі
// а. по натискані на лішку - тоглити клас чекед
// б. написати логіку видалення задачі зі списку: якщо ми натиснемо на крестик то задача повинна бути видаленою

//????????? - З локальним сховищем:

// 1. будемо зберігати задачі у вигляді масиву об'єктів
// а. об'єкт з полями: text, isDone, id (потрібно для пошуку, видалення, оновлення статусу) - повинен бути як у елементу,
// так і об'єкту сховищі
// 2. коли ми додаємо Лі на сторінку будемо додавати її у сторедж
// 3. Написати логіку функції яка буде діставати дані зі стореджа і буде додавати дані у вигляді Лі на сторінку
// 4. написати логіку для видалення таски зі стору і для оновлення стану таски

import { addNewTask, handleTaskBehaviour, fillTasksList } from "./functions.js";

const myUL = document.getElementById("myUL");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addNewTask);

// Додаємо при натисканні клас
myUL.addEventListener("click", handleTaskBehaviour);

// Подія яка спрацьовує при побудові DOM дерева і ми длдаємо функцію яка буде зберігати всі данні при перезавантаженні сторінки
window.addEventListener("DOMContentLoaded", fillTasksList);
