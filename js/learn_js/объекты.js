const myDog = {
  "name": "Fess",
  "legs": 4,
  "tails": 0,
  "friends": ["me",2]
 // [id10]: 123  // создание символа
};
console.log(myDog);

function Dog(name) {  //конструктор создания объекта через NEW. Название с большой буквы
  this.name = name;   //присвоение нэйму значения из параметра
  this.legs = 11;
  this.tails = 11;
  this.friends = ["me",11];
  this.sayHi = function() {  //в конструкторе можно сразу прописывать методы
    console.log('my name is ' + this.name)
  }
}
let someDog = new Dog("not Fess");  //вызов конструктора через NEW, при этом начинает работать this, и при этом не нужно делать return
console.log(someDog);

//  использование this
let user = { name: "Джон" };
let admin = { name: "Админ" };
function sayHi() {
  alert( this.name );
}
// используем одну и ту же функцию в двух объектах
user.f = sayHi;
admin.f = sayHi;
// вызовы функции, приведённые ниже, имеют разное значение this
// "this" внутри функции является ссылкой на объект, который указан "перед точкой"
user.f(); // Джон  (this == user)
admin.f(); // Админ  (this == admin)
admin['f'](); // Админ (неважен способ доступа к методу - через точку или квадратные скобки)

const createAnyDog = () => {  //конструктор создания объекта через return
  return {
    name: 'Fess12',
    legs: 22,
    tails: 22,
    friends: ["me",22]
  }
}
const anyDog = createAnyDog();
console.log(anyDog);

function makeUser(name, age) { //сокращенное написание конструктора для создания объекта
  return {
    name, // то же самое, что и name: name
    age   // то же самое, что и age: age
    // ...
  };
}

// создание в конструкторе методов
function User(name) {
  this.name = name;
  this.sayHi = function() {
    alert( "Меня зовут: " + this.name );
  };
}
let vasya = new User("Вася");
vasya.sayHi(); // Меня зовут: Вася

//проверка наличия свойства у объекта
let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age существует
alert( "blabla" in user ); // false, user.blabla не существует
let key = "age";
alert( key in user ); // true, имя свойства было взято из переменной key
// но часто проверка осуществляется так:
let user = {};
alert( user.noSuchProperty === undefined ); // true означает "свойства нет"

const twoDogs = {
  "wifeDog" : {
  "name": "Fess2",
  "legs": 3,
  "tails": 1,
  "friends": ["wife",2]},
  "notMyDog" : {
    "name": "ass",
    "legs": 8,
    "tails": 5,
    "friends": ["devil",666]},
};

var myMusic = [  //сложный массив с двумя объектами
  {
    "artist": "Billy Joel",
    "title": "Piano Man",
    "release_year": 1973,
    "formats": [
      "CS",
      "8T",
      "LP" ],
    "gold": true
  }
  // Добавьте объект с описанием альбома
  , {
    "artist": "ass",
    "title": "ass",
    "release_year": 1976,
    "formats": [
      "CS",
      "8T",
      "LP" ]
  }
];



let id1 = Symbol("id");  //создание символов
let id2 = Symbol("id");  // разные символы, то что описание разное - не важно
console.log(id1.toString());  //Symbol(id)
console.log(id1.description);  //id
// по умолчанию символы скрыты и не будут вызываться в обычных обращениях , но при этом методы клонирования, типа assign, символы учтутся

// читаем символ из глобального реестра и записываем его в переменную
let id = Symbol.for("id"); // если символа не существует, он будет создан
// читаем его снова и записываем в другую переменную (возможно, из другого места кода)
let idAgain = Symbol.for("id");
// проверяем -- это один и тот же символ
alert( id === idAgain ); // true

// получаем символ по имени
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");
// получаем имя по символу
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id


myDog[id1] = 1;
console.log(myDog[id1]);

myDog.legs = 4; //можно изменять отдельные свойства. точечная нотация
console.log(myDog['legs']);  //скобочная нотация
console.log(myDog['bark'] = 'woof');  // добавление новых свойств - просто присвоением и назначением
delete myDog.tails;  // удаление свойств
console.log(myDog.hasOwnProperty('name'));  //  поиск наличия свойства по ключу
console.log(myMusic[0].formats[1]);  //доступ к сложному объекту

let search = elem => myDog[elem];  //функция поиска элемента по ключу
console.log(search('name'));

//ЦИКЛ ПЕРЕБОРА СВОЙСТВ МАССИВА  ITEM - КЛЮЧ
for (let item in myDog) {
  console.log(item);
  console.log(myDog[item]);
};

//  ПРЕОБРАЗОВАНИЕ ОБЪЕКТА В МАССИВ, РАБОТА ЧЕРЕЗ МЭП, А ЗАТЕМ ОБРАТНОЕ ПРЕОБРАЗОВАНИЕ. ТРАНСФОРМАЦИЯ ОБЪЕКТОВ
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};
let doublePrices = Object.fromEntries(
  // преобразовать в массив, затем map, затем fromEntries обратно объект
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
alert(doublePrices.meat); // 8

//проверка объекта на пустоту
function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

//  умножение всех чисел на 2
function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'number') {  //проверка значения на число
      obj[key] *= 2;
    }
  }
}

console.log(Object.keys(myDog));  //создает массив ключей объекта
console.log(Object.keys(myDog).join(' '));  // массив в строку

console.log(Object.keys(myMusic).join(' '));  //работает и для массива, выдавая индексы
console.log(Object.values(myDog));  //создает массив значений объекта
console.log(Object.values(myDog).join(' '));
console.log(Object.keys(twoDogs));
console.log(Object.values(twoDogs));  // возвратит два масссива
console.log(Object.values(twoDogs.myDog)); // значение первого массива

console.log(Object.entries(myDog));  //создает массив массивов ключей и значений
console.log(Object.entries(twoDogs));  //создает 2 массива массивов

console.log(Object.assign({}, myDog, twoDogs)); //соединяет объекты, но уходят названия myDog, twoDogs.

console.log(Object.assign({}, myDog, someDog));  //Одинаковые значения взаимозаменяются слева направо. Так что нужно быть осторожнее с этим. Вместо {} - можно указывать принимающий объект, но это изменит его изначальный вид
let clone = Object.assign({}, myDog);  //клонирование объекта майдог в клон.
// но если в объекте есть другой объект это не сработает. нужно будет или рекурсивно вложенные объекты копировать или использовать  _.cloneDeep(obj) - уже прописанное в Лодэше

let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {  // символьный метод по умолчанию. переводит объект в зависимости от конткста в строку/число или дефолт
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};
// демонстрация результатов преобразований:
alert(user); // hint: string -> {name: "John"}
console.log(user);  // выведет объект, тк нет преобразования в строку
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

// ПРЕОБРАЗОВАНИЕ ОБЪЕКТОВ В ПРИМИТИВЫ
Boolean(obj) // true

//Соответственно, тоже самое будет в любой операции, возвращающей boolean.
//Теперь разберемся со строками. Попытка привести наш obj к строке:

String(obj) //object object

//Чо за ботва? Если у объекта не прописан метод toString(), то он выводит свой скрытый, который и возвращает строчку 'object object'. А если прописать собственный метод toString(), то будет использоваться уже он:

obj.toString = function(){return 'my string'};
String(obj); // my string

//Теперь с числами. Если попытаться привести наш объект к числу, то что он выведет?

Number(obj); // my string

//Это чё за хня ещё? Дело в том, что если в объекте не прописан метод valueOf(), то Number использует метод toString(), а если нет и его, то выводит NaN. Напишем свой valueOf():

obj.valueOf = function(){ return 'my number' }
Number(obj) // my number

//ЗАДАЧИ ----------------------------------------------------------
//задачка-калькулятор с использованием this и методов, возвращающие результаты вычислений
let calculator = {
  read : function() {
    a = prompt("введите a", 10);
    b = prompt('введите b', 15);
    return this.a = a,  this.b = b;
  },
  sum() {
    return +this.a + +this.b;
  },
  mul() {
    return +this.a * +this.b;
  }
}
calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
console.log(calculator);


let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;  // возвращаем для возможности дальнейшей работы по цепочке
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // показывает текущую ступеньку
    alert( this.step );
    return this;
  },
  showThis() {
    console.log(this);
  }
};

ladder.up().up().down().showStep().showThis(); // 1


function BigUser() {
  this.name = "Вася";
  return { name: "Godzilla" };  // <-- возвращает этот объект
}
//alert( new BigUser().name );  // Godzilla, получили этот объект
const ass = new BigUser();
console.log(ass);

//так можно создать одинаковые объекты через конструктор
let obj = {};
function A() { return obj; }
function B() { return obj; }
alert( new A() == new B() ); // true

//задачка-калькулятор через конструктор с использованием this и методов, возвращающие результаты вычислений

function Calculator() {
  this.read = function() {
    a = prompt("введите a", 10);
    b = prompt('введите b', 15);
    return this.a = a,  this.b = b;
  },
  this.sum = function() {
    return +this.a + +this.b;
  },
  this.mul = function() {
    return +this.a * +this.b;
  }
}
let calculator = new Calculator();
calculator.read();
alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );


//функция - конструктор для складывания чисел, введенных пользователем
function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function() {
    this.value += +prompt('введите число', 10);
  }
}
let accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
alert(accumulator.value); // выведет сумму этих значений


// СУММА ВСЕХ ЗАРПЛАТ
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
function sumSalaries(obj) {
  let transform = Object.values(obj);
  return transform.reduce((sum,current) => sum + current, 0);
}
// ИЛИ ТАК ЧЕРЕЗ for..of
// function sumSalaries(salaries) {
//   let sum = 0;
//   for (let salary of Object.values(salaries)) {
//     sum += salary;
//   }
//   return sum; // 650
// }
//  ИЛИ ТАК. ИНТЕРЕСНАЯ ИДЕЯ ПРЕОБРАЗОВАНИЯ МАССИВА В ОДИН ИЗ ЕГО ЭЛЕМЕНТОВ
// function sumSalaries(obj){
//   if(Object.keys(obj).length === 0) return 0;
//   return Object.entries(obj).map(i => i[1]).reduce((s, i) => s + i);
//   }


alert( sumSalaries(salaries) ); // 650


let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};
let doublePrices = Object.fromEntries(
  // преобразовать в массив, затем map, затем fromEntries обратно объект
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
alert(doublePrices.meat); // 8
