// ИСПОЛЬЗОВАНИЕ ПРОКСИ ДЛЯ МЕТОДА GET
let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // значение по умолчанию
    }
  }
});
console.log( numbers[1] ); // 1
console.log( numbers[123] ); // 0 (нет такого элемента)


// ИСПОЛЬЗОВАНИЕ ПРОКСИ ДЛЯ МЕТОДА GET
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};
dictionary = new Proxy(dictionary, {
  get(target, phrase) { // перехватываем чтение свойства в dictionary
    if (phrase in target) { // если перевод для фразы есть в словаре
      return target[phrase]; // возвращаем его
    } else {
      // иначе возвращаем непереведённую фразу
      return phrase;
    }
  }
});
// Запросим перевод произвольного выражения в словаре!
// В худшем случае оно не будет переведено
alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (нет перевода)

// ВАЛИДАЦИЯ ВВОДИМЫХ ДАННЫХ ПРИ ПОМОЩИ SET
let numbers = [];
numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // для перехвата записи свойства
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});
numbers.push(1); // добавилось успешно
numbers.push(2); // добавилось успешно
console.log(numbers);
console.log("Длина: " + numbers.length); // 2
numbers.push("тест"); // TypeError (ловушка set на прокси вернула false)
alert("Интерпретатор никогда не доходит до этой строки (из-за ошибки в строке выше)");

// ФИЛЬТРАЦИЯ ЗНАЧЕНИЙ ДЛЯ МЕТОДОВ FOR..IN , OBJECT.KEYS, OBJECT.VALUES ПРИ ПОМОЩИ СВОЙСТВА OWNKEYS ДЛЯ ОБЪЕКТОВ
let user = {
  name: "Вася",
  age: 30,
  _password: "***"
};
user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});
// ownKeys исключил _password
for(let key in user) alert(key); // name, затем: age
// аналогичный эффект для этих методов:
console.log(user);
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // Вася,30


// ОШИБКА СВЯЗАННАЯ С ОТСУТСТВИЕМ СВ-ВА ENUMERABLE У ДЕСКРИПТОРА
let user = { };
user = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c'];
  }
});
alert( Object.keys(user) ); // <пусто>


// ПРИСВОЕНИЕ ВСЕМ СВОЙСТВАМ ФЛАГА ENUMERABLE: TRUE, CONFIGURABLE: TRUE
let user = { ass: 'big' }; // будет заменено
user = new Proxy(user, {
  ownKeys(target) { // вызывается 1 раз для получения списка свойств
    return ['a', 'b', 'c'];
  },
  getOwnPropertyDescriptor(target, prop) { // вызывается для каждого свойства
    console.log(`${prop}`);
    return {
      enumerable: true,
      configurable: true
      /* ...другие флаги, возможно, "value: ..." */
    };
  }
});
console.log( Object.keys(user) ); // a, b, c



// ВАЛИДАЦИЯ СКРЫТЫХ ДЛЯ ПОЛЬЗОВАТЕЛЯ СВОЙСТВ, НАЧИНАЮЩИХСЯ С _. ПРИ ПОМОЩИ GET, SET, DELETEPROPERTY И OWNKEYS
let user = {
  name: "Вася",
  _password: "***",
  checkPassword(value) {
    // метод объекта должен иметь доступ на чтение _password
    return value === this._password;
  }
};
user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      let value = target[prop];
      return (typeof value === 'function') ? value.bind(target) : value; // (проверка, для того чтобы методы самого объекта имели доступ к внутренним свойствам объекта)
    }
  },
  set(target, prop, val) { // перехватываем запись свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // перехватываем удаление свойства
    if (prop.startsWith('_')) {
      throw new Error("Отказано в доступе");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // перехватываем попытку итерации
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});
// "get" не позволяет прочитать _password
try {
  console.log(user._password); // Error: Отказано в доступе
} catch(e) { console.log(e.message); }
// "set" не позволяет записать _password
try {
  user._password = "test"; // Error: Отказано в доступе
} catch(e) { console.log(e.message); }
// "deleteProperty" не позволяет удалить _password
try {
  delete user._password; // Error: Отказано в доступе
} catch(e) { console.log(e.message); }
// "ownKeys" исключает _password из списка видимых для итерации свойств
for(let key in user) console.log(key); // name, checkPassword


// HAS - ПРОВЕРКА IN
let range = {
  start: 1,
  end: 10
};
range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end
  }
});
alert(5 in range); // true
alert(50 in range); // false


// В ОБЫЧНОМ ПЕРЕНАПРАВЛЕНИИ ВЫЗОВА ТЕРЯЮТСЯ СВ-ВА ОРИГИНАЛЬНОЙ ФУНКЦИИ
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}
function sayHi(user) {
  alert(`Привет, ${user}!`);
}
alert(sayHi.length); // 1 (в функции length - это число аргументов в её объявлении)
sayHi = delay(sayHi, 3000);
alert(sayHi.length); // 0 (в объявлении функции-обёртки ноль аргументов)

// ПЕРЕНАПРАВЛЕНИЕ ФУНКЦИИ ПРИ ПОМОЩИ PROXY - БОЛЕЕ МОЩНОЕ.
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}
function sayHi(user) {
  alert(`Привет, ${user}!`);
}
sayHi = delay(sayHi, 3000);
alert(sayHi.length); // 1 (*) прокси перенаправляет чтение свойства length на исходную функцию
sayHi("Вася"); // Привет, Вася! (через 3 секунды)

// ИСПОЛЬЗОВАНИЕ REFLECT, ДЛЯ ПРОПИСЫВАНИЯ ОРИГИНАЛЬНЫХ ДЕЙСТВИЙ
let user = {
  name: "Вася",
};
user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});
let name = user.name; // выводит "GET name"
user.name = "Петя"; // выводит "SET name=Петя"


// ПОПЫТКА ВЗЯТЬ ПРОТОТИП У ПРОКСИ С ГЕТТЕРОМ
let user = {
  _name: "Гость",
  get name() {
    return this._name;
  }
};
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});
let admin = {
  __proto__: userProxy,
  _name: "Админ"
};
// Ожидается: Админ
alert(admin.name); // выводится Гость (?!?)


// ИСПОЛЬЗОВАНИЕ REFLECT.GET ИСПРАВЛЯЕТ ТАКИЕ СИТУАЦИИ
let user = {
  _name: "Гость",
  get name() {
    return this._name;
  }
};
let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});
let admin = {
  __proto__: userProxy,
  _name: "Админ"
};
alert(admin.name); // Админ


// ПРОКСИРОВАНИЕ ОБЪЕКТОВ MAP, SET, DATE, PROMISE ТРЕБУЕТ ИСПОЛЬЗОВАНИЯ REFLECT, ИНАЧЕ БУДУТ ОШИБКИ, СВЯЗАННЫЕ С ВНУТРЕННЕЙ РЕАЛИЗАЦИИ МЕОТДОВ ГЕТ И СЕТ
let map = new Map();
let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});
proxy.set('test', 1);
alert(proxy.get('test')); // 1 (работает!)
