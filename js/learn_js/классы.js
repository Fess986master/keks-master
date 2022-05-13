// СИНТАКСИС КЛАССОВ

class MyClass {
  // методы класса
  constructor() {
    ...
  }
  method1() {
    ...
  }
  method2() {
    ...
  }
  method3() {
      ...
    }
    ...
}

// СОЗДАНИЕ И ВЫЗОВ КЛАССОВ
class MyClass {
  constructor(name) {
    this.name = name;
    this.surname = 'aseg';
  }
  sayHi() {
    console.log('ass' + this.name);
  }
}
let newClass = new MyClass('bigAss');
console.log(newClass);
newClass.sayHi();


// КЛАСС - РАЗНОВИДНОСТЬ ФУНКЦИИ
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}
// доказательство: User - это функция
alert(typeof User); // function

// ЧТО ЕСТЬ ЧТО...
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// класс - это функция
console.log(typeof User); // function

// ...или, если точнее, это метод constructor
console.log(User === User.prototype.constructor); // true

// Методы находятся в User.prototype, например:
console.log(User.prototype.sayHi); // alert(this.name);
console.log(User.sayHi); //undefined

// в прототипе ровно 2 метода
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

console.log(Object.getOwnPropertyNames(User)); // "prototype", "length", "name"


// ОСОБЕННОСТИ КЛАССОВ

class User {
  constructor() {}
}
alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'

// строковое значение классов:
class User {
  constructor() {}
}
alert(User); // class User { ... }

// "NAMED CLASS EXPRESSION"
// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // имя MyClass видно только внутри класса
  }
};
new User().sayHi(); // работает, выводит определение MyClass
alert(MyClass); // ошибка, имя MyClass не видно за пределами класса

// СОЗДАНИЕ КЛАССА ЧЕРЕЗ ЗАПРОС
function makeClass(phrase) {
  // объявляем класс и возвращаем его
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}
// Создаём новый класс
let User = makeClass("Привет");
new User().sayHi(); // Привет

// использование геттеров и сеттеров

class User {
  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое.");
      return;
    }
    this._name = value;
  }
}
let user = new User("Иван");
alert(user.name); // Иван
user = new User(""); // Имя слишком короткое.

//При объявлении класса геттеры/сеттеры создаются на User.prototype, вот так:
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});

//Пример с вычисляемым свойством в скобках [...]:
class User {
  ['say' + 'Hi']() {
    alert("Привет");
  }
}
new User().sayHi();

// СВОЙСТВА КЛАССОВ
class User {
  name = "Аноним";
  sayHi() {
    alert(`Привет, ${this.name}!`);
  }
}
new User().sayHi();


function makeClass(name, fess) {
  return class fess2 {   // fess2 - название функции. оно не обязательно
    constructor() {
      this.name = name;
      this.ass = 'very big';
    }
    sayHy() {
      console.log("hi");
      console.log(fess);
    }
  }
}
let newClass = makeClass('ass', "i am class name");
let newnewObj = new newClass('imya');  // параметр не принимается, так как уже прописан в конструкторе
console.log(newClass);
console.log(newnewObj);
//console.log(User.ass)
newnewObj.sayHy();


class User {
  constructor(name) {
this.name = name;
  }
get name() {
  return this._name;
}
}

let userMax = new User('Max');
console.log(userMax.name);
//console.log(userMax);





class User {
  constructor(name) {
    // вызывает сеттер
    this.names = name;
  }

  get names() {
    return this._names;
  }

  set names(value) {
    if (value.length < 4) {
      console.log("Имя слишком короткое.");
      return;
    }
    this.names = value;
  }

}

let user = new User("Иван");
console.log(user.name); // Иван
console.log(user.names); // Иван

user = new User(""); // Имя слишком короткое.
console.log(user);





let user = {
  name : 'ass',

  get name() {
    return this.sehtehw;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое, должно быть более 4 символов");
      return;
    }
    this.sehtehw = this.name;
  }
};
console.log(user.name);
//user.name = "Pete";
// alert(user.name); // Pete
// console.log(user);

// user.name = ""; // Имя слишком короткое...





class User {

  constructor(name) {
    // вызывает сеттер
    this.name = name;

  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое.");
      return;
    }
    this._name = value;
  }

}

let user = new User("Иван");
alert(user.name); // Иван
user.name = 'ah';   // проверяется и прямое назначение/переназначение
user.n = 'ahrjst';  // это свойство удалится после того как создастся новый user
console.log(user);
user = new User(""); // Имя слишком короткое. Создается новый объект
user2 = new User("marya");
console.log(user);
console.log(user2);

// НАСЛЕДОВАНИЕ КЛАССОВ
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} стоит.`);
  }
}
// Наследуем от Animal указывая "extends Animal"
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}
let rabbit = new Rabbit("Белый кролик");
rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.hide(); // Белый кролик прячется!

// ПЕРЕОПРЕДЕЛЕНИЕ МЕТОДОВ
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} стоит.`);
  }
}
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
  stop() {
    super.stop(); // вызываем родительский метод stop
    this.hide(); // и затем hide
  }
}
let rabbit = new Rabbit("Белый кролик");
rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!

// ПЕРЕОПРЕДЕЛЕНИЕ СВОЙСТВ. В КОНСТРУКТОРЕ ОБЯЗАТЕЛЬНО НУЖНО УКАЗЫВАТЬ SUPER , ИНАЧЕ THIS НЕ ОПРЕДЕЛИТСЯ И БУДЕТ ОШИБКА
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}
class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  // ...
}
// теперь работает
let rabbit = new Rabbit("Белый кролик", 10);
alert(rabbit.name); // Белый кролик
alert(rabbit.earLength); // 10

// STATIC - МЕТОД КЛАССА
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}
// использование
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];
articles.sort(Article.compare);
alert( articles[0].title ); // CSS


// СОЗДАНИЕ ПУСТОЙ СТАТЬИ С СЕГОДНЯШНЕЙ ДАТОЙ.
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createTodays() {
    // помним, что this = Article
    return new this("Сегодняшний дайджест", new Date());
  }
}
let article = Article.createTodays();
alert( article.title ); // Сегодняшний дайджест

// СТАТИСТИЧЕСКИЕ СВОЙСТВА
class Article {
  static publisher = "Илья Кантор";
}
alert( Article.publisher ); // Илья Кантор

// НАСЛЕДОВАНИЕ СТАТИСТИЧЕСКИЙ КЛАССОВ И МЕТОДОВ
class Animal {
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}
// Наследует от Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}
let rabbits = [
  new Rabbit("Белый кролик", 10),
  new Rabbit("Чёрный кролик", 5)
];
rabbits.sort(Rabbit.compare);
rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.


// НАСЛЕДОВАНИЕ ОТ ВНУТРЕННИХ ОБЪЕКТОВ
// добавим один метод (можно более одного)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}
let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false
let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false // тоже работает так как filteredArr тоже будет иметь прототип PowerArray. пох почему, лучше не вникать

// STATIC GET [SYMBOL.SPECIES] - ОТВЕЧАЕТ ЗА ПОРЯДОК НАСЛЕДИЯ ПРИ ИСПОЛЬЗОВАНИЯ ТАКИХ МЕТОДОВ КАК FILTER, MAP И ТД
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
  // встроенные методы массива будут использовать этот метод как конструктор
  static get [Symbol.species]() {
    return Array;
  }
}
let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false
// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
let filteredArr = arr.filter(item => item >= 10);
// filteredArr не является PowerArray, это Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

// INSTANCEOF - ПРОВЕРКА ОБЪЕКТА, ПРИНАДЛЕЖИТ ЛИ ОН К УКАЗАННОМУ КЛАССУ
class Rabbit {}
let rabbit = new Rabbit();
// это объект класса Rabbit?
alert( rabbit instanceof Rabbit ); // true
alert( rabbit instanceof Object ); // true

//ЗАДАЧА - СОЗДАНИЕ ЧАСИКОВ-------------------------------


class Clock {
  constructor(template) {
    this.template = template;
    console.log(template);
  }
  render() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;
    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;
    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);
    console.log(output);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);  // используется стрелочная функция для того чтобы this - оставался привязанным к
  }
}
let clock = new Clock('h:m:s');
console.log(clock);
clock.start();





// задача создания наследуемого объекта ----------------------
class Animal {
  constructor(name) {
    this.name = name;
  }

}
class Rabbit extends Animal {
  constructor(ass, name) {
    super(name);
    this.created = Date.now();
    this.ass = ass;
  }
}
let rabbit = new Rabbit("Big", "Белый кролик"); // Error: this is not defined
console.log(Animal);
console.log(Rabbit);
console.log(rabbit);
//alert(rabbit.name);


// УЛУЧШЕННЫЕ ЧАСЫ, УНАСЛЕДОВАННЫЕ ОТ ОБЫЧНЫХ ----------------
class Clock {
  constructor(template) {
    this.template = template;
  }
  render() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;
    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;
    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);
    console.log(output);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}
class ExtendedClock extends Clock {
  constructor(options, precision1) {
    super(options);
    if (precision1) {
    this.precision = precision1}
    else {this.precision = 1000}
  }
  start() {
    super.render();
    setInterval(() => super.render(), this.precision);
  }
}
let clock = new ExtendedClock('h:m:s', 3000);
clock.start();

// РЕШЕНИЕ ЧЕРЕЗ ДЕСТРУКТОРИЗАЦИЮ ОБЪЕКТА ПЕРЕДАВАЕМОГО В КОНСТРУКТОР. ЕСЛИ В ОБЪЕКТЕ НЕТ СВОЙСТВА PRECISION, ТО ПО УМОЛЧАНИЮ ПРИСВОИТСЯ 1000
// class ExtendedClock extends Clock {
//   constructor(options) {
//     super(options);
//     let { precision=1000 } = options;
//     this.precision = precision;
//   }

//   start() {
//     this.render();
//     this.timer = setInterval(() => this.render(), this.precision);
//   }
// };


class Animal {
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}
// Наследует от Animal
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} прячется!`);
  }
}
let rabbits = [
  new Rabbit("Белый кролик", 10),
  new Rabbit("Чёрный кролик", 5)
];
rabbits.sort(Animal.compare);
console.log(rabbits);
rabbits[0].run(20); // Чёрный кролик бежит со скоростью 5.
