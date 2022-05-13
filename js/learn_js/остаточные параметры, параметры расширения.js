//  СБОР ВСЕХ ПАРАМЕТРОВ В МАССИВ
function sumAll(...args) { // args — имя массива
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6

// СБОР ОСТАТОЧНЫХ ПАРАМЕТРОВ В МАССИВЕ
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Юлий Цезарь

  // Оставшиеся параметры пойдут в массив
  // titles = ["Консул", "Император"]
  alert( titles[0] ); // Консул
  alert( titles[1] ); // Император
  alert( titles.length ); // 2
}

// ARGUMENTS. УСТАРЕВШЕЕ ИСПОЛЬЗОВАНИЕ, ТК НЕ ЯВЛЯЕТСЯ ПОЛНОЦЕННЫМ МАССИВОМ И НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ НЕКОТОРЫЕ ФУНКЦИИ, ПО ТИПУ  MAP
showName("Юлий", "Цезарь", "Консул", "Император");
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );
  // Объект arguments можно перебирать
  // for (let arg of arguments) alert(arg);
}
// Вывод: 2, Юлий, Цезарь
showName("Юлий", "Цезарь");
// Вывод: 1, Илья, undefined (второго аргумента нет)
showName("Илья");

// СТРЕЛОЧНАЯ ФУНКЦИЯ НЕ ИМЕЕТ СОБСТВЕННОГО ARGUMENTS, КАК И THIS, И БЕРЕТ ИХ У РОДИТЕЛЯ
function f() {
  let showArg = () => alert(arguments[0]);
  showArg(2);
}

f(1); // 1


// ОПЕРАТОР РАСШИРЕНИЯ. СОЗДАЕТ ИЗ МАССИВА СПИСОК ПАРАМЕТРОВ
let arr = [3, 5, 1];
alert( Math.max(...arr) ); // 5 (оператор "раскрывает" массив в список аргументов)

// МОЖНО ПЕРЕДАВАТЬ НЕСКОЛЬКО ОБЪЕКТОВ
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
alert( Math.max(...arr1, ...arr2) ); // 8

// МОЖНО ДАЖЕ ЧЕРЕДОВАТЬ С ОБЫЧНЫМИ ПАРАМЕТРАМИ
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

// ИСПОЛЬЗОВАНИЕ ПАРАМЕТРА РАСШИРЕНИЯ ДЛЯ ОБЪЕДИНЕНИЯ ОБЪЕКТА
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];
let merged = [0, ...arr, 2, ...arr2];
alert(merged); // 0,3,5,1,2,8,9,15 (0, затем arr, затем 2, в конце arr2)

// ИСПОЛЬЗОВАНИЕ ДЛЯ РАЗБИТИЯ СТРОКИ НА ПАРАМЕТРЫ
let str = "Привет";
alert( [...str] ); // П,р,и,в,е,т
// ЭТО ЭКВИВАЛЕНТНО
let str = "Привет";
// Array.from преобразует перебираемый объект в массив
alert( Array.from(str) ); // П,р,и,в,е,т
// способ с Array более универсален

// ЕСЛИ НАМ НУЖНО ПОМЕНЯТЬ КАКИЕ ЛИБО ПАРАМЕТРЫ В ПЕРЕДАВАЕМОЙ ФУНКЦИИ
const a = {
  name: "Vanya",
  age: 30,
  job: "driver",
};
const b = {
 ...a,
 age: 40,
};
// b = {name: "Vanya", age: 40, job: "driver"};
Работает как Object.assign
const c = Object.assign({}, a, {age: 20});
// c = {name: "Vanya", age: 20, job: "driver"};
