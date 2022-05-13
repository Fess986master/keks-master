// ОБЪЕКТ MAP
let map = new Map();
map.set("1", "str1");    // строка в качестве ключа
map.set(1, "num1");      // цифра как ключ
map.set(true, "bool1");  // булево значение как ключ
// помните, обычный объект Object приводит ключи к строкам?
// Map сохраняет тип ключей, так что в этом случае сохранится 2 разных значения:
alert(map.get(1)); // "num1"
alert(map.get("1")); // "str1"
alert(map.size); // 3

// ИСПОЛЬЗОВАНИЕ ОБЪЕКТА ВМЕСТО КЛЮЧА
let john = { name: "John" };
// давайте сохраним количество посещений для каждого пользователя
let visitsCountMap = new Map();
// объект john - это ключ для значения в объекте Map
visitsCountMap.set(john, 123);
alert(visitsCountMap.get(john)); // 123


// ПРОБУЕМ ИСПОЛЬЗОВАТЬ В КАЧЕСТВЕ КЛЮЧА ОБЪЕКТА ДРУГОЙ ОБЪЕКТ
let john = { name: "John" };
let john1 = { name: "John1" };
let visitsCountObj = {}; // попробуем использовать объект
visitsCountObj[john] = 123; // возьмём объект john как ключ
visitsCountObj[john1] = 1234;
// Вот как это было записано!
console.log( visitsCountObj[john] );
console.log( visitsCountObj[john1] ); // 123
console.log(visitsCountObj);

// MAP.SET ВОЗРАЩАЕТ ОБЪЕКТ MAP, ПОЭТОМУ МОЖНО СДЕЛАТЬ ЦЕПОЧКУ
map.set("1", "str1")
  .set(1, "num1")
  .set(true, "bool1");


  // ПЕРЕБОР MAP
  let recipeMap = new Map([
    ["огурец", 500],
    ["помидор", 350],
    ["лук",    50]
  ]);
  // перебор по ключам (овощи)
  for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // огурец, помидор, лук
  }
  // перебор по значениям (числа)
  for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
  }
  // перебор по элементам в формате [ключ, значение]
  for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
    alert(entry); // огурец,500 (и так далее)
  }

// У МЭПА ЕСТЬ МЕТОД FOREACH
  // выполняем функцию для каждой пары (ключ, значение)
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`); // огурец: 500 и так далее
});

// СОЗДАНИЕ MAP ИЗ МАССИВА
// массив пар [ключ, значение]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
alert( map.get('1') ); // str1

// СОЗДАНИЕ MAP ИЗ ОБЪЕКТА
let obj = {
  name: "John",
  age: 30
};
let map = new Map(Object.entries(obj));
console.log(map);

// СОЗДАНИЕ ОБЪЕКТА ИЗ MAP
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);
// prices = { banana: 1, orange: 2, meat: 4 }
alert(prices.orange); // 2

// СОЗДАНИЕ ОБЪЕКТА ИЗ MAP
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);
let obj = Object.fromEntries(map.entries()); // создаём обычный объект (*)
// готово!
// obj = { banana: 1, orange: 2, meat: 4 }
alert(obj.orange); // 2

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// ОБЪЕКТ SET - ПОХОЖ НА МАССИВ, НО ХРАНИТ ТОЛЬКО УНИКАЛЬНЫЕ ЗНАЧЕНИЯ
// считаем гостей, некоторые приходят несколько раз
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);
// set хранит только 3 уникальных значения
alert(set.size); // 3
for (let user of set) {
  alert(user.name); // John (потом Pete и Mary)

// ПЕРЕБОР ЗНАЧЕНИЙ
let set = new Set(["апельсин", "яблоко", "банан"]);
for (let value of set) alert(value);
// то же самое с forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});

// ХРАНЕНИЕ ОБЪЕКТА В MAP ОСТАЕТСЯ ДАЖЕ ЕСЛИ ИСХОДНЫЙ ОБЪЕКТ УДАЛЕН
let john = { name: "John" };
let map = new Map();
map.set(john, "...");
john = null; // перезаписываем ссылку на объект
console.log(map); // все норм
console.log(john); // null
console.log(map.keys());  // итератор
// объект john сохранён внутри объекта `Map`,
// он доступен через map.keys()

