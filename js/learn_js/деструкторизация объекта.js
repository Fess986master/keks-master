const myDog = {
  name: 'Fess',
  'legs': 4,
  'tails': 0,
  'friends': ['me',2],
};

const myIntArray = [10, -54, 65, -12, 56, 45];


const {name, legs, tails} = myDog;  // деструктризация ключей из объекта. Теперь можно вызывать объект напрямую через них. Имя ключа должно быть уникально и не совпадать с другими ключами и переменными
let {friends, ass = 'ass'} = myDog;  //  если есть необходимость менять определенныу ключи. Так же можно добавлять ключи по умолчанию, даже если у объекта таковых нет
console.log (name);

const [first, sec] = myIntArray;  //  деструкторизация массива. Очень важен порядок индексации
const [,,,, fife] = myIntArray;  //  запятыми можем пропускать ненужные индексы. Тут мы пропускаем 4 элемента и назначаем только 5
console.log(sec);
console.log(fife);

const [firstLetter, secondLetter] = 'строка'  // деструкторировать можно побуквенно и строку

//Мы можем использовать что угодно «присваивающее» с левой стороны.
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');
alert(user.name); // Ilya

let user = {
  name: "John",
  age: 30,
  ass: 'big',
};

// ЦИКЛ ПО КЛЮЧАМ И ЗНАЧЕНИЯМ
for (let [key, value] of Object.entries(user)) {
 // value = 'ass';
  alert(`${key}:${value}`); // name:John, затем age:30
}


// ОСТАТОЧНЫЕ ПАРАМЕТРЫ. ИМЯ МОЖЕТ БЫТЬ ЛЮБОЕ, НО ОБЯЗАТЕЛЬНЫ 3 ТОЧКИ
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert(name1); // Julius
alert(name2); // Caesar
// Обратите внимание, что `rest` является массивом.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2

//ЕСЛИ НЕ ОПРЕДЕЛЕНО, ОШИБКИ НЕ БУДЕТ
let [firstName, surname] = [];
alert(firstName); // undefined
alert(surname); // undefined

// ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ.
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
alert(name);    // Julius (из массива)
alert(surname); // Anonymous (значение по умолчанию)

// prompt запустится только для surname, так как для name - значение будет назначено
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
alert(name);    // Julius (из массива)
alert(surname); // результат prompt

// ДЛЯ ПРОИЗВОЛЬНОГО ПРИСВАИВАНИЯ ":", ТАК ЖЕ МОЖНО СТАВИТЬ ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ
let options = {
  title: "Menu",
  width: 100,
  height: 200
};
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
// width -> w
// height -> h
// title -> title
alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200

// НЕ ОБЯЗАТЕЛЬНО БРАТЬ ВСЕ ОБЪЕКТЫ
let options = {
  title: "Menu",
  width: 100,
  height: 200
};
// взять только title, игнорировать остальное
let { title } = options;
alert(title); // Menu

//ОСТАТОК ОБЪЕКТА
let options = {
  title: "Menu",
  height: 200,
  width: 100
};
// title = свойство с именем title
// rest = объект с остальными свойствами
let {title, ...rest} = options;
// сейчас title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100

//ВЛОЖЕННАЯ ДЕСТРУКТОРИЗАЦИЯ.
let options = {
  size: {   //  переменные для сайз и айтемс не будут назначены
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};
// деструктуризация разбита на несколько строк для ясности
let {
  size: { // положим size сюда
    width,
    height
  },
  items: [item1, item2], // добавим элементы к items
  title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
} = options;
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut

// ПЕРЕДАЧА ОБЪЕКТА В КАЧЕСТВЕ ПАРАМЕТРА АВТОМАТИЧЕСКИ ДЕСТРУКТОРИЗИРУЕТ ЭТОТ ОБЪЕКТ И ЕГО СВОЙСТВА СТАНОВЯТСЯ ПАРАМЕТРАМИ ФУНКЦИИ, ЗА ИСКЛЛЮЧЕНИЕМ СВОЙСТВ, КОТОРЫХ НЕТ В ФУНКЦИИ. При этом другие параметры не срабатывают
// мы передаём объект в функцию
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};
// ...и она немедленно извлекает свойства в переменные
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – взято из options,
  // width, height – используются значения по умолчанию
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}
showMenu(options, 300);

// синтаксис в функции с переназначением
function({
  incomingProperty: varName = defaultValue
  ...
})
//Тогда для объекта с параметрами будет создана переменная varName для свойства с именем incomingProperty по умолчанию равная defaultValue.

// ПРИ ТАКОЙ ПОДАЧЕ ОБЯЗАТЕЛЬНО УКАЗАТЬ ОБЪЕКТ
showMenu({}); // ок, все значения - по умолчанию
showMenu(); // так была бы ошибка
// или назначив значение по умолчанию для всего объекта:
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}
showMenu(); // Menu 100 200

// СБОР ВСЕХ ЗНАЧЕНИЙ В МАССИВ. КОГДА МЫ НЕ ЗНАЕМ СКОЛЬКО ПАРАМЕТРОВ БУДЕТ У ФУНКЦИИ
function sum(...arr) {
  let sum = 0
  for (let item of arr) {
  sum += item
  }
  return sum
  }

  console.log(sum(1, 2, 3, 12, -10)) // 8


// ЗАДАЧИ --------------------------------------------------------------
// поиск самого высокооплачиваемого сотрудника
 let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
function topSalary(salaries) {
  if (salaries.John === undefined)  {return null};
  let valueMax = 0;
for (let [key, value] of Object.entries(salaries)) {
  if (key == undefined) return null;
if (value > valueMax) {valueMax = value};
}
return valueMax;
}
console.log(topSalary(salaries));
//альтернативный вариант через сортировку
//const topSalary = salaries => Object.entries(salaries).sort(([a, b], [c , d])=>(d-b))[0][1]
