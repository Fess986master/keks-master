//СВОЙСТВО NAME
function sayHi() {
  alert("Hi");
}
alert(sayHi.name); // sayHi

let sayHi = function() {
  alert("Hi");
};
alert(sayHi.name); // sayHi (есть имя!)

let user = {
  sayHi() {
    // ...
  },
  sayBye: function() {
    // ...
  }
}
alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye

//СВОЙСТВО «LENGTH» - КОЛИЧЕСТВО ПАРАМЕТРОВ ФУНКЦИИ

function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}  // остаточные параметры не считаются

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2


// ВЫЗОВ ФУНКЦИЙ С АРГУМЕНТАМИ ИЛИ БЕЗ В ЗАВИСИМОСТИ ОТ ЗАПРОСА
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
// для положительных ответов вызываются оба типа обработчиков
// для отрицательных - только второго типа
ask("Вопрос?", () => alert('Вы ответили да'), result => alert(result));

// ДОБАВЛЕНИЕ СВОЙСТВ ФУНКЦИИ
function sayHi() {
  alert("Hi");
  // давайте посчитаем, сколько вызовов мы сделали
  sayHi.counter++;
}
sayHi.counter = 0; // начальное значение
sayHi(); // Hi
sayHi(); // Hi

alert( `Вызвана ${sayHi.counter} раза` ); // Вызвана 2 раза

// добавление свойств функции
function makeCounter() {
  // вместо
  // let count = 0
  function counter() {
    return counter.count++;
  };
  counter.count = 0;
  return counter;
}
let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1

// к  свойствам функции мы можем обратиться откуда угодно и даже их менять в отличии от переменных - исходя из этой особенности решаем хотим ли мы переменную или же свойство
function makeCounter() {
  function counter() {
    return counter.count++;
  };
  counter.count = 0;
  return counter;
}
let counter = makeCounter();
counter.count = 10;  // обращение и замена свойства
alert( counter() ); // 10

//Named Function Expression - функциональное выражение с объявленным именем функции
let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John

// В NFE МЫ МОЖЕМ ВЫЗЫВАТЬ САМУ СЕБЯ ПО ИМЕНИ
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // использует func, чтобы снова вызвать себя же
  }
};
sayHi(); // Hello, Guest
// А вот так - не cработает:
func(); // Ошибка, func не определена (недоступна вне функции)

// при перезаписи
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // Теперь всё в порядке
  }
};
let welcome = sayHi;
sayHi = null;
console.log(welcome.name);  // имя функции func
welcome(); // Hello, Guest (вложенный вызов работает)


// ЗАДАЧИ -------------------------------------------------
//добавление функций в каунтер

function makeCounter() {
  function counter() {
    return counter.count++;
  };
  counter.count = 0;
  counter.set = function (value) {
    return counter.count = value;
  };
  counter.decrease = function() {
   return counter.count--;
 }
  return counter;

}
let counter = makeCounter();
counter.count = 10;  // обращение и замена свойства
alert( counter() ); // 10

//console.log(counter.count);
console.log(counter.set(15));
counter.decrease();
counter.decrease();
console.log(counter());
//counter.set(value)

// БЕСКОНЕЧНЫЕ АРГУТЕНТЫ ФУНКЦИИ
function sum(a) {
 sum.currentSum = a;
   function f(b) {
    sum.currentSum += b;
    return f;
    }
// мы можем не проводить это преобразование, если нам достаточно будет знать значение переменной sum.currentSum
   f.toString = function() {
    return sum.currentSum;
   };
  return f;
}
sum(1)(2)(3)(4);
//console.log(String(sum(1)(2)(3)));
console.log(sum.currentSum);
//console.log (sum(1)(2));
console.log(f.currentSum);

alert( sum(1)); // 3
alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15


//решение через рекурсию
function sum(a) {
  const closure = b => sum(a + b);
  closure.toString = () => a;
  return closure;
}

alert( sum(1)(2)(3) ); // 3
