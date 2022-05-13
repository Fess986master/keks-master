// ПРИМЕР С ОШИБКАМИ
try {

  alert('Начало блока try');  // (1) <--

  lalala; // ошибка, переменная не определена!

  alert('Конец блока try (никогда не выполнится)');  // (2)

} catch(err) {

  alert(`Возникла ошибка!`); // (3) <--

}


// ОШИБКА НЕ НАЙДЕТСЯ, ТАК КАК ДЕЙСТВИЕ  SETTIMEOUT- ОТЛОЖЕННОЕ И ОБРАБОТЧИК УЖЕ ВЫЕДЕТ ИЗ БЛОКА ТРАЙ/КЕТЧ ВО ВРЕМЯ ОШИБКИ
try {
  setTimeout(function() {
    noSuchVariable; // скрипт упадёт тут
  }, 1000);
} catch (e) {
  alert( "не сработает" );
}
// ПРАВИЛЬНОЕ ИСПОЛЬЗОВАНИЕ В ЭТОМ СЛУЧАЕ:
setTimeout(function() {
  try {
    noSuchVariable; // try..catch обрабатывает ошибку!
  } catch {
    alert( "ошибка поймана!" );
  }
}, 1000);

// ОБРАБОТКА НЕ ЯВНЫХ ОШИБОК ЧЕРЕЗ THROW. СОЗДАНИЕ СВОЕГО КОДА ОШИБКИ
let json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json); // <-- выполнится без ошибок
  if (!user.name) {
    throw new SyntaxError("Данные неполны: нет имени"); // (выполнение try на этом закончится и код перебросится на catch, при этом имея новое сообщение об ошибке )
  }
  alert( user.name );
} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: Данные неполны: нет имени
}


// ОШИБКИ ХРАНЯТСЯ В ОБЪЕКТЕ ERR
try {
  lalala; // ошибка, переменная не определена!
} catch(err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // lalala is not defined
  console.log(err.stack); // ReferenceError: lalala is not defined at (...стек вызовов)

  // Можем также просто вывести ошибку целиком
  // Ошибка приводится к строке вида "name: message"
  console.log(err); // ReferenceError: lalala is not defined
}

// проброс ошибки из блока во внешний блок (в данном примере нет внешнего блока)
let json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json);
  if (!user.name) {
    throw new SyntaxError("Данные неполны: нет имени");
  }
  blabla(); // неожиданная ошибка
  alert( user.name );
} catch(e) {
  if (e.name == "SyntaxError") {
    alert( "JSON Error: " + e.message );
  } else {
    throw e; // проброс (*)
  }
}

//ВНЕШНИЙ БЛОК ТРАЙ/КЕТЧ
function readData() {
  let json = '{ "age": 30 }';
  try {
    // ...
    blabla(); // ошибка!
  } catch (e) {
    // ...
    if (e.name != 'SyntaxError') {
      throw e; // проброс исключения (не знаю как это обработать)
    }
  }
}
try {
  readData();
} catch (e) {
  alert( "Внешний catch поймал: " + e ); // поймал!
}

// блок finally - выполняется всегда

try {
  alert( 'try' );
  if (confirm('Сгенерировать ошибку?')) BAD_CODE();
} catch (e) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}

//  пример применения finally
let num = +prompt("Введите положительное целое число?", 35)
let diff, result;
function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Должно быть целое неотрицательное число");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
let start = Date.now();
try {
  result = fib(num);
} catch (e) {
  result = 0;
} finally {
  diff = Date.now() - start;
}
alert(result || "возникла ошибка");
alert( `Выполнение заняло ${diff}ms` );

// ЗАДАЧА ВАЛИДАЦИИ КОНВЕРТИРОВАНИЯ СВОЙСТВ ИХ JSON.

class ValidationError extends Error {  // класс проверки валидации, наследуется от Error
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
class PropertyRequiredError extends ValidationError {  // класс валидации на предмет отсутствующего свойства
  constructor(property) {
    super("Нет свойства: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
// Применение
function readUser(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
  return user;
}
// Рабочий пример с try..catch
try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert("Неверные данные: " + err.message); // Неверные данные: Нет свойства: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
  } else if (err instanceof SyntaxError) {
    alert("Ошибка синтаксиса JSON: " + err.message);
  } else {
    throw err; // неизвестная ошибка, повторно выбросит исключение
  }
}

// ХЗ ЧЕ ТАКОЕ . ТИПА ОБХОД НАЗВАНИЙ
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
class ValidationError extends MyError { }
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Нет свойства: " + property);
    this.property = property;
  }
}
// name корректное
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError


// объединенный код валидации ошибок и синтаксических, таких как ошибка в JSON и таких как недостача каких либо свойств
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}
class ValidationError extends Error { /*...*/ }   // код описан выше
class PropertyRequiredError extends ValidationError { /* ... */ }  // код описан выше
function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;
  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Синтаксическая ошибка", err);
    } else {
      throw err;
    }
  }
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Ошибка валидации", err);
    } else {
      throw err;
    }
  }

}
try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
    alert("Исходная ошибка: " + e.cause);
  } else {
    throw e;
  }
}


// ЗАДАЧИ -----------------------
class  FormatError extends SyntaxError {
  constructor(message) {
    super(message);
this.name = 'FormatError';
this.stack = 'stack';
  }
}

let err = new FormatError("ошибка форматирования");

console.log( err.message ); // ошибка форматирования
console.log( err.name ); // FormatError
console.log( err.stack ); // stack

console.log( err instanceof FormatError ); // true
console.log( err instanceof SyntaxError ); // true (потому что наследует от SyntaxError)


