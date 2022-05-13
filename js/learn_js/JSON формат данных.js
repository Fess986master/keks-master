
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

let json = JSON.stringify(student);

alert(typeof json); // мы получили строку!

alert(json);
console.log(json);
/* выведет объект в формате JSON:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/

// ВЛОЖЕННЫЕ ОБЪЕКТЫ ПРЕОБРАЗУЮТСЯ БЕЗ ПРОБЛЕМ
let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
};
alert( JSON.stringify(meetup) );
/* вся структура преобразована в строку:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/

//  ЦИКЛИЧЕСКИЕ ССЫЛКИ НЕ БУДУТ ПРЕОБРАЗОВЫВАТЬСЯ
let room = {
  number: 23
};
let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};
meetup.place = room;       // meetup ссылается на room
room.occupiedBy = meetup; // room ссылается на meetup
JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в JSON

// ЕСЛИ ХОТИМ ЧТО ТО ИСКЛЮЧИТЬ, ТО ДОБАВЛЯЕМ СПИСОК ТОГО ЧТО ДОЛЖНО БЫТЬ ВКЛЮЧЕНО. let json = JSON.stringify(value, [replacer, space]) (полное описание)
let room = {
  number: 23
};
let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup ссылается на room
};
room.occupiedBy = meetup; // room ссылается на meetup
alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

//ДЛЯ ОТКЛЮЧЕНИЯ ОДНОГО ИЗ СВОЙСТВ ЧЕРЕЗ ФУНКЦИЮ, которая работает рекурсивно по вложенным объектам в том числе
let room = {
  number: 23
};
let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup ссылается на room
};
room.occupiedBy = meetup; // room ссылается на meetup
alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

// ТРЕТИЙ ПАРАМЕТР СПЭЙС - НУЖЕН ДЛЯ УДОБОЧИТАЕМОСТИ, ЕСЛИ НАС ИНТЕРЕСУЕТ ВЫВОД НА ЭКРАН И ТД
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};
alert(JSON.stringify(user, null, 2));

// ЕСЛИ МЫ ХОТИМ ДАТЬ УТОЧНЕНИЕ К МЕТОДУ ВЫЗОВА
let room = {
  number: 23,
  toJSON() {
    return this.number;
  }
};
let meetup = {
  title: "Conference",
  room
};
alert( JSON.stringify(room) ); // 23
alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "room": 23
  }
*/

//let value = JSON.parse(str, [reviver]);
// ОБРАТНОЕ ДЕКОДИРОВАНИЕ

// вызов для вложенного объекта
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
user = JSON.parse(user);
console.log(user);

// ТИПИЧНЫЕ ОШИБКИ (ЕСЛИ НАПРИМЕР НАПИСАН ДЛЯ ОТЛАДКИ)
let json = `{
  name: "John",                     // Ошибка: имя свойства без кавычек
  "surname": 'Smith',               // Ошибка: одинарные кавычки в значении (должны быть двойными)
  'isAdmin': false                  // Ошибка: одинарные кавычки в ключе (должны быть двойными)
  "birthday": new Date(2000, 2, 3), // Ошибка: не допускается конструктор "new", только значения.
  "friends": [0,1,2,3]                     // Здесь всё в порядке
}`;

// ЕСЛИ НУЖНА КОРРЕКЦИЯ ПРЕОБРАЗОВАНИЯ, ТО ДОБАВЛЯЕМ ФУНКЦИЮ
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
alert( meetup.date.getDate() ); // 30 - теперь работает!

// ЗАДАЧА. ИЗБАВЛЕНИЕ ОТ ЗАЦИКЛЕННЫХ СВОЙСТВ ПО ЗНАЧЕНИЮ СВОЙСТВ
let room = {
  number: 23
};
let meetup = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: room
};
// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

console.log(String([{name: "Иванов"}, {name: "Петров"}]));
console.log(JSON.stringify([{name: "Иванов"}, {name: "Петров"}]));

console.log( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));



