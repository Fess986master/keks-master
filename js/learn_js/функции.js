const a = 10;
const b = 5;
//const mySum = 0;
const myMixedArray = ['строка', 15, 34, 'и еще одна', '"Привет!"'];
let myString = 'Привет я тестовая строка';


myDecFunction();
function myDecFunction() {
  return console.log('Деклоративный способ объявления функции. Может быть описан до и после вызова')
}

const myFuncFunction = function() {
  return console.log('Функцианальный способ объявления функции. Должен быть описан перед вызовом')
}
myFuncFunction();

const f = function factorial(n) {
  return n ? n*factorial(n-1) : 1;   //рекурсивный вызов функции самой себя
};
var g = f;  // скопировали ссылку на функцию-факториал в g
console.log( g(5) ); // 120, работает!


let sum = (a, b) => a + b;  // Стрелочный вид задания функции. Если только одно выражение,  return можно опустить
console.log(sum(a,b));

const mySum = sum(100, 100);  //  переменная можежт содержать функцию
console.log(mySum);

let sum2 = (a = 15, b = 15) => a + b;  // Стрелочный вид задания функции с указанием значений аргументов по умолчанию.
console.log(sum2(39));  // вызов только с первым параметром. второй берется  по умолчанию

let double = n => n * 2;  //  Стрелочная функция. Если аргумент один, то скобки не нужны
console.log(double(3));

let sayHi = () => console.log("Hello!");   //  Стрелочная функция. Если параметров нет, то пустые скобки
sayHi();


// функция возвращает функцию. функция()()
const sum = function(a) {
  return sum2 = function(b) {
    return Math.pow(a,b);
  }
}
console.log(sum(2)(3));

// функция от a b возвращает другую функцию с аргументом- элементом массива, который и проходит проверку, сравнивая результат с условием
/* .. ваш код для inBetween и inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];
function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}
function inArray([a,b,c]) {
  return function(x) {
    return x == a || x == b || x == c;
  };
}
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

function showMessage(from, text = anotherFunction()) {
  // anotherFunction() выполнится только если не передан text
  // результатом будет значение text
}

//использование функций - колбеков
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
function showOk() {
  alert( "Вы согласны." );
}
function showCancel() {
  alert( "Вы отменили выполнение." );
}
// использование: функции showOk, showCancel передаются в качестве аргументов ask
ask("Вы согласны?", showOk, showCancel);

//колбеки можно прописывать в самой функции
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
ask(
  "Вы согласны?",
  function() { alert("Вы согласились."); },
  function() { alert("Вы отменили выполнение."); }
);

