// ПРИВЯЗКА КОНТЕКСТА USER К ФУНКЦИИ SHOWFULLNAME ЧЕРЕЗ CALL
function showFullName() {
  alert( this.firstName + " " + this.lastName );
}
var user = {
  firstName: "Василий",
  lastName: "Петров"
};
// функция вызовется с this=user
showFullName.call(user) // "Василий Петров"

// ТО ЖЕ САМОЕ, НО С АРГУМЕНТАМИ
var user = {
  firstName: "Василий",
  surname: "Петров",
  patronym: "Иванович"
};
function showFullName(firstPart, lastPart) {
  alert( this[firstPart] + " " + this[lastPart] );
}
// f.call(контекст, аргумент1, аргумент2, ...)
showFullName.call(user, 'firstName', 'surname') // "Василий Петров"
showFullName.call(user, 'firstName', 'patronym') // "Василий Иванович"

// ОДАЛЖИВАНИЕ МЕТОДА У МАССИВА. А ТАК ЖЕ ПРЕВРАЩЕНИЕ КОЛЛЕКЦИИ В МАССИВ
function printArgs() {
  arguments.join = Array.prototype.join; // одолжили метод (1)
  //arguments.join = [].join;  можно так вместо (1)
  var argStr = arguments.join(';'); // (2)
  console.log( argStr ); // сработает и выведет 1:2:3
  let pseudo = Array.from(argStr);
  console.log(Array.isArray(pseudo));

}
printArgs(1, 2, 3);

// ПРИНЦИП РАБОТЫ JOIN
function join(separator) {
  if (!this.length) return '';
  var str = this[0];
  for (var i = 1; i < this.length; i++) {
    str += separator + this[i];
  }
  return str;
}

// ОБЫЧНЫЙ ОБЪЕКТ С ЧИСЛОВЫМИ ИНДЕКСАМИ И LENGTH
var obj = { // обычный объект с числовыми индексами и length
  0: "А",
  1: "Б",
  2: "В",
  length: 3
};
obj.join = [].join;
alert( obj.join(';') ); // "A;Б;В"

// СПОСОБ СДЕЛАТЬ МАССИВ
function printArgs() {
  // вызов arr.slice() скопирует все элементы из this в новый массив
  var args = [].slice.call(arguments);
  alert( args.join(', ') ); // args - полноценный массив из аргументов
}
printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир


// ПРИМЕНЕНИЕ МЕТОДА MATH.MAX К МАССИВУ ЧЕРЕЗ APPLY
var arr = [];
arr.push(1);
arr.push(5);
arr.push(2);
// получить максимум из элементов arr
alert( Math.max.apply(null, arr) ); // 5


// КЭШИРОВАНИЕ РЕЗУЛЬТАТОВ МЕДЛЕННОЙ ФУНКЦИИ ПРИ ПОМОЩИ ФУНКЦИИ - ОБЕРТКИ
function slow(x) {
  // здесь могут быть ресурсоёмкие вычисления
  x = x*2;
  console.log(`Called with ${x}`);
  return x;
}
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {    // если кеш содержит такой x,
      return cache.get(x); // читаем из него результат
    }
    let result = func(x); // иначе, вызываем функцию
    cache.set(x, result); // и кешируем (запоминаем) результат
    console.log(cache);  // не вызывается при  повторном запросе
    return result;
  };
}
slow1 = cachingDecorator(slow);
console.log( slow1(1) ); // slow(1) кешируем
console.log( "Again: " + slow1(1) ); // возвращаем из кеша
console.log( slow(2) ); // slow(2) кешируем
console.log( "Again: " + slow(2) ); // возвращаем из кеша

// для кэширования методов объектов используем call
let worker = {
  someMethod() {
    return 1;
  },
  slow(x) {
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)

  }
};

function cachingDecorator(func) {
  let cache = new Map();
  console.log('внутри функции');
    console.log(this);
   return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    console.log('внутри декоратора');
    console.log(this);  // почему в качестве this тут передается worker??
    //console.log(worker);
    let result = func.call(this, x); // теперь 'this' передаётся правильно
    cache.set(x, result);
    return result;
  };
}
worker.slow = cachingDecorator(worker.slow); // теперь сделаем её кеширующей
console.log( worker.slow(2) ); // работает
console.log( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)


//ВЕРСИЯ ДЕКОРАТОРА ДЛЯ МНОГИХ АРГУМЕНТОВ
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};
function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }
    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}
function hash(args) {
  return args[0] + ',' + args[1];
}
worker.slow = cachingDecorator(worker.slow, hash);
alert( worker.slow(3, 5) ); // работает
alert( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)


// РАЗНЫЕ СПОСОБЫ РАБОТЫ С КОЛЛАМИ
let worker = {
  someMethod() {
    return 2;
  },
  slow(x) {
    console.log("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};
console.log(worker.slow(10));
//let result = worker.slow(20);
//let result = result2.call(this, 20);
console.log(worker.slow.call(worker, 20));

// ПОТЕРЯ КОНТЕКСТА THIS
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};
//let f = user.sayHi.call(user);
let f = user.sayHi;
setTimeout(f, 1000); // контекст user потеряли
//setTimeout(user.sayHi, 1000); // Привет, undefined!


// РЕШЕНИЕ ПОТЕРИ КОНТЕКСТА ЧЕРЕЗ ЗАМЫКАНИЕ
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};
setTimeout(() => user.sayHi(), 1000); // Оборачиваем в другую функцию и при вызове контекст появляется

// ИСПОЛЬЗОВАНИЕ BIND ДЛЯ ПРИВЯЗКИ КОНТЕКСТА К ФУНКЦИИ
let user = {
  firstName: "Вася"
};
function func() {
  alert(this.firstName);
}
let funcUser = func.bind(user);
funcUser(); // Вася


// BIND ТАК ЖЕ АВТОМАТОМ ПЕРЕНОСИТ АРГУМЕНТЫ ФУНКЦИЙ
let user = {
  firstName: "Вася"
};
function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}
// привязка this к user
let funcUser = func.bind(user);
funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this = user)

// ДЛЯ МЕТОДОВ ЭТО ТОЖЕ РАБОТАЕТ
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};
let sayHi = user.sayHi.bind(user); // (*)
sayHi(); // Привет, Вася!
setTimeout(sayHi, 1000); // Привет, Вася!

// ЦИКЛ ДЛЯ ПРИВЯЗКИ ВСЕХ ФУНКЦИЙ К КОНТЕКСТУ
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}

// ИСПОЛЬЗОВАНИЕ BIND ДЛЯ ПРИВЯЗКИ АРГУМЕНТОВ
function mul(a, b) {
  return a * b;
}
let double = mul.bind(null, 2);
alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10


// МАССОВАЯ ПРИВЯЗКА
let user = {
  firstName: "Вася",
  say(phrase) {
    console.log(`${phrase}, ${this.firstName}!`);
  }
};
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
say("Привет"); // Привет, Вася (аргумент "Привет" передан в функцию "say")
say("Пока"); // Пока, Вася (аргумент "Пока" передан в функцию "say")

//передача объекта в контекст напрямую
function f() {
  alert(this.name);
}
f = f.bind( {name: "Вася"} );
f(); // Вася

//  задачи -----------------------------------------
// ЗАДАЧА СУММИРОВАНИЯ АРГУМЕНТОВ
function sumArgs() {
  /* ваш код */
  let args = [].slice.call(arguments);
  //let args = Array.from(arguments);  //можно так
  return args.reduce(function(a, b) {
    return a + b;
  });
}
alert( sumArgs(1, 2, 3) ); // 6, аргументы переданы через запятую, без массива


// ФУНКЦИЯ КОТОРАЯ APPLYALL(FUNC, ARG1, ARG2...), ГДЕ FUNC -ВЫЗЫВАЕМАЯ ФУНКЦИЯ

function sum() { // суммирует аргументы: sum(1,2,3) = 6
  return [].reduce.call(arguments, function(a, b) {
    return a + b;
  });
}
function mul() { // перемножает аргументы: mul(2,3,4) = 24
  return [].reduce.call(arguments, function(a, b) {
    return a * b;
  });
}
// function applyAll(func, ...arg) {
//   return func.call(func, ...arg)
// }

function applyAll(func,ar) {
  let args = [].slice.call(ar);
  return func.call(func, args)
}


alert( applyAll(sum, 1, 2, 3) ); // -> sum(1, 2, 3) = 6
alert( applyAll(mul, 2, 3, 4) ); // -> mul(2, 3, 4) = 24
