// ДЕСКРИПТОР СВОЙСТВА

let user = {
  name: "John"
};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log( JSON.stringify(descriptor, null, 2 ) );
console.log(descriptor);
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/


// СОЗДАНИЕ НОВОГО СВ-ВА С НОВЫМИ ДИСКРИПТОРАМИ
let user = {};
Object.defineProperty(user, "name", {
  value: "John"
});
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

// ТОЛЬКО ЧТЕНИЕ
let user = {
  name: "John"
};
Object.defineProperty(user, "name", {
  writable: false
});
user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'

// ТОЛЬКО ЧТЕНИЕ С 0
let user = { };
Object.defineProperty(user, "name", {
  value: "John",
  // для нового свойства необходимо явно указывать все флаги, для которых значение true
  enumerable: true,
  configurable: true
});
alert(user.name); // John
user.name = "Pete"; // Ошибка


// ПЕРЕЧИСЛЯЕМЫЕ МЕТОДЫ
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};
// По умолчанию оба свойства выведутся:
for (let key in user) console.log(user[key]); // name, toString

// ДЕЛАЕМ МЕТОД НЕ ПЕРЕЧИСЛЯЕМЫМ

let user = {
  name: "John",
  toString() {
    return this.name;
  }
};
Object.defineProperty(user, "toString", {
  enumerable: false
});
// Теперь наше свойство toString пропало из цикла:
for (let key in user) alert(key); // name

let user = { };

// ЕСЛИ ДЕЛАЕМ СВ-ВО НЕКОНФИГУРИРУЕМЫМ, ТО ЭТО НАВСЕГДА
Object.defineProperty(user, "name", {
  value: "John",
  writable: false,
  configurable: false
});
// теперь невозможно изменить user.name или его флаги
// всё это не будет работать:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", {writable: true}); // Ошибка

// СИНТАКСИС DEFINEPROPERTIES - ОПИСАНИЕ СРАЗУ НЕСКОЛЬКИХ СВОЙСТВ
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});

// ПРИМЕР
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});

//  ДЛЯ ПОЛНОГО КЛОНИРОВАНИЯ СО ФЛАГАМИ, СИМВОЛАМИ И ПРОЧЕГО
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// данный клон не делает ничего со флагами и символами
for (let key in user) {
  clone[key] = user[key]
}

// ГЛОБАЛЬНАЯ ЗАПЕЧАТКА ОБЪЕКТА. ИСПОЛЬЗУЕТСЯ РЕДКО

Object.preventExtensions(obj)
    Запрещает добавлять новые свойства в объект.
Object.seal(obj)
    Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
Object.freeze(obj)
    Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false для всех существующих свойств.

А также есть методы для их проверки:

Object.isExtensible(obj)
    Возвращает false, если добавление свойств запрещено, иначе true.
Object.isSealed(obj)
    Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.
Object.isFrozen(obj)

// ГЕТТЕРЫ И СЕТТЕРЫ

let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;  // геттер
  }
};
alert(user.fullName); // John Smith . вызывается без ()

// ПРОСТО ТАК В ГЕТТЕР НЕЛЬЗЯ ЗАПИСАТЬ
let user = {
  get fullName() {
    return `...`;
  }
};
user.fullName = "Тест"; // Ошибка (у свойства есть только геттер)

// СЕТТЕР ДЛЯ ЗАПИСИ СВОЙСТВ
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};
// set fullName запустится с данным значением
user.fullName = "Alice Cooper ass";  // ass - не запишется
alert(user.name); // Alice
alert(user.surname); // Cooper
console.log(user);

// ОПИСАНИЕ ЧЕРЕЗ ДЕСКРИПТОР
let user = {
  name: "John",
  surname: "Smith"
};
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});
alert(user.fullName); // John Smith
for(let key in user) alert(key); // name, surname

// использование для проверки входных данных
let user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое, должно быть более 4 символов");
      return;
    }
    this._name = value;
  }
};
user.name = "Pete";
alert(user.name); // Pete
console.log(user);
user.name = ""; // Имя слишком короткое...


// ДОБАВЛЕНИЕ НОВЫХ ПОЛЕЗНЫХ СВОЙСТВ НА ОСНОВЕ ИЗВЕСТНЫХ
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  // возраст рассчитывается из текущей даты и дня рождения
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}
let john = new User("John", new Date(1992, 6, 1));
alert( john.birthday ); // доступен как день рождения
alert( john.age );      // ...так и возраст
