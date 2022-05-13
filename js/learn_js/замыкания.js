// ПРИМЕР РАБОТЫ ФУНКЦИИ С ЛОГИЧЕСКИМ ОКРУЖЕНИЕМ
function makeWorker() {
  let name = "Pete";
  return function() {
    alert(name);
  };
}
let name = "John";
// create a function
let work = makeWorker();
// call it
work(); // что будет показано? "Pete" (из места создания) или "John" (из места выполнения)

// ЦИКЛЫ, УСЛОВИЯ ХРАНЯТ СОБСТВЕННОЕ ЛОГИЧЕСКОЕ ОКРУЖЕНИЕ
for (let i = 0; i < 10; i++) {
  // У каждой итерации цикла своё собственное лексическое окружение
  // {i: value}
}
alert(i); // Ошибка, нет такой переменной

// БЛОКИ КОДА НУЖНЫ ДЛЯ ИЗОЛЯЦИИ ВНУТРЕННИХ ПЕРЕМЕННЫХ
{
  // сделать какую-нибудь работу с локальными переменными, которые не должны быть видны снаружи

  let message = "Hello";

  alert(message); // Hello
}

alert(message); // Ошибка: переменная message не определена


// ПУТИ СОЗДАНИЯ IIFE -  УСТАРЕВШИЕ СПОСОБЫ, НА ЗАМЕНУ КОТОРЫМ ПРИШЛИ БЛОКИ КОДА. СМЫСЛ В ТОМ ЧТОБЫ ФУНКЦИЯ ЗАРАБОТАЛА БЕЗ ВЫЗОВА

(function() {
  alert("Скобки вокруг функции");
})();

(function() {
  alert("Скобки вокруг всего");
}());

!function() {
  alert("Выражение начинается с логического оператора NOT");
}();

+function() {
  alert("Выражение начинается с унарного плюса");
}();


function f() {
  let value = Math.random();
  console.log(value);

  function g() {
    console.log('ass'); // в консоли: напишите alert(value); Такой переменной нет!
  }
  g();
  return g;
}
// let g = f();
// g();
f();  // так функция g почему то не вызывается


// РЕШЕНИЕ ЗАДАЧ  -----------------------------------------
// ФУНКЦИЯ В ФУНКЦИИ
function sum(a) {
  return function sum(b) {
    return a + b;
  }
}
console.log(sum(1)(2));
console.log(sum(5)(-1));

// ФИЛЬТРАЦИЯ МАССИВА
function inBetween(a,b) {  //между а и б
  return function(item) {
    return (item >= a) && (item <=b);
  }
}
function inArray(array) {  // если есть совпадения в массиве
  return function(item) {
    return array.includes(item);
  }
}
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6)));
console.log(arr.filter(inArray([1, 2, 10])));


// ФИЛЬТРАЦИЯ ОБЪЕКТА ПО ЗАДАННОМУ ПОЛЮ

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

// по имени (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// по возрасту (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);

function byField(prop) {
  return (a, b) => a[prop] > b[prop] ? 1 : -1;
}

users.sort(byField('name'));
users.sort(byField('age'));

// АРМИЯ ФУНКЦИЙ

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let j = i;
    let shooter = function() { // функция shooter
      alert( j ); // должна выводить порядковый номер
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
