let now = new Date();
alert( now ); // показывает текущие дату и время
console.log(now);


// 0 соответствует 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
alert( Jan01_1970 );

// теперь добавим 24 часа и получим 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
alert( Jan02_1970 );

let date = new Date("2017-01-26");
alert(date);
console.log(date);
// Время не указано, поэтому оно ставится в полночь по Гринвичу и
// меняется в соответствии с часовым поясом места выполнения кода
// Так что в результате можно получить
// Thu Jan 26 2017 11:00:00 GMT+1100 (восточно-австралийское время)
// или
// Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)

new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // то же самое, так как часы и проч. равны 0

// текущая дата
let date = new Date();

// час в вашем текущем часовом поясе
alert( date.getHours() );

// час в часовом поясе UTC+0 (лондонское время без перехода на летнее время)
alert( date.getUTCHours() );

alert( date.getTime() );  // количество мс с 1970 года

уществуют методы получения года, месяца и т.д. из объекта Date:

getFullYear()
    Получить год (4 цифры)
getMonth()
    Получить месяц, от 0 до 11.
getDate()
    Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
getHours(), getMinutes(), getSeconds(), getMilliseconds()
    Получить, соответственно, часы, минуты, секунды или миллисекунды.
    getDay()  -  день недели начинается с воскресения - 0


Следующие методы позволяют установить компоненты даты и времени:

    setFullYear(year, [month], [date])
    setMonth(month, [date])
    setDate(date)
    setHours(hour, [min], [sec], [ms])
    setMinutes(min, [sec], [ms])
    setSeconds(sec, [ms])
    setMilliseconds(ms)
    setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)

    let today = new Date();

    today.setHours(0);
    alert(today); // выводится сегодняшняя дата, но значение часа будет 0

    today.setHours(0, 0, 0, 0);
    alert(today); // всё ещё выводится сегодняшняя дата, но время будет ровно 00:00:00.

    // установка високосного года
    let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

alert( date ); // 1 Mar 2016

let date = new Date(2016, 0, 2); // 2 Jan 2016

// можно использовать отрицательные числа, получая предыдущий месяц
date.setDate(1); // задать первое число месяца
alert( date );
date.setDate(0); // первый день месяца -- это 1, так что выводится последнее число предыдущего месяца
alert( date ); // 31 Dec 2015



// вычисление интервала времени вычитанием дат.
let start = new Date(); // начинаем отсчёт времени
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}
let end = new Date(); // заканчиваем отсчёт времени
alert( `Цикл отработал за ${end - start} миллисекунд` );

// Date.now() - не создает объект
let start = Date.now(); // количество миллисекунд с 1 января 1970 года
// выполняем некоторые действия
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}
let end = Date.now(); // заканчиваем отсчёт времени

alert( `Цикл отработал за ${end - start} миллисекунд` ); // вычитаются числа, а не даты

//  бенчмарк - сравнение скорости работы методов
unction diffSubtract(date1, date2) {
  return date2 - date1;
}
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();
  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}
let time1 = 0;
let time2 = 0;
// bench(upperSlice) и bench(upperLoop) поочерёдно запускаются 10 раз
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
alert( 'Итоговое время diffSubtract: ' + time1 );
alert( 'Итоговое время diffGetTime: ' + time2 );

// СИНТАКСИС SETTIMEOUT
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}
setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон
// МОЖНО ТАК
setTimeout(() => alert('Привет'), 1000);

// ОТМЕНА ТАЙМЕРА
let timerId = setTimeout(...);
clearTimeout(timerId);

// ИДЕНТИФИКАТОР ТАЙМЕРА В БРАУЗЕРЕ - ЧИСЛО. НО ТАКОЕ...
let timerId = setTimeout(() => alert("ничего не происходит"), 1000);
alert(timerId); // идентификатор таймера
clearTimeout(timerId);
alert(timerId); // тот же идентификатор (не принимает значение null после отмены)

// ИНТЕРВАЛ И ЕГО ОСТАНОВКА
// повторить с интервалом 2 секунды
let timerId = setInterval(() => alert('tick'), 2000);
// остановить вывод через 5 секунд
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

// ИСПОЛЬЗОВАНИЕ ВЛОЖЕННОГО SETTIMEOUT ДЛЯ ЗАДАНИЯ ИНТЕРВАЛА
/** вместо:
let timerId = setInterval(() => alert('tick'), 2000);
*/
let timerId = setTimeout(function tick() {
  alert('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);

// смена интервала в зависимости от условий
let delay = 5000;
let timerId = setTimeout(function request() {
  ...отправить запрос...
  if (ошибка запроса из-за перегрузки сервера) {
    // увеличить интервал для следующего запроса
    delay *= 2;
  }
  timerId = setTimeout(request, delay);
}, delay);

// SETTIMEOUT C НУЛЕВОЙ ЗАДЕРЖКОЙ ВЫПОЛНЯЕТСЯ ВСЁ РАВНО ПОСЛЕ ОСНОВНОГО КОДА
setTimeout(() => alert("Мир"));
alert("Привет");

// ЗАДЕРЖКА МЕЖДУ ИСПОЛЬЗОВАНИЯМИ НУЛЕВЫХ ТАЙМЕРОВ 4+ МСЕК
let start = Date.now();
let times = [];
setTimeout(function run() {
  times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова
  if (start + 100 < Date.now()) alert(times); // показываем задержку через 100 мс
  else setTimeout(run); // если нужно ещё запланировать
});
// пример вывода:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100

//ЗАДАЧИ --------------------------------------------------------------

// ОПРЕДЕЛЕНИЕ И ВЫВОД ДНЯ НЕДЕЛИ
let date = new Date(2012, 0, 4);  // 3 января 2012 года
const getWeekDay = function(date) {
  let day = date.getDay();
  let dayName;
  switch(day) {
    case 0 : dayName = "ВС";
    break;
    case 1 : dayName = "ПН";
    break;
    case 2 : dayName = "ВТ";
    break;
    case 3 : dayName = "СР";
    break;
    case 4 : dayName = "ЧТ";
    break;
    case 5 : dayName = "ПТ";
    break;
    case 6 : dayName = "СБ";
    break;
  }
  return dayName;
}
console.log(getWeekDay(date));

// РЕШЕНИЕ ЧЕРЕЗ МАССИВ

function getWeekDay(date) {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  return days[date.getDay()];
}
let date = new Date(2014, 0, 3); // 3 января 2014 года
alert( getWeekDay(date) ); // ПТ

// ЕВРОПЕЙСКИЕ ЧАСЫ (С ПН ПО ВС. С 1 ДО 7)
let date = new Date(2012, 0, 1);  // 3 января 2012 года
function getLocalDay(date) {
  // if ( date.getDay() == 0 ) {
  //   return 7;
  // }
  // else return date.getDay();
  return ( date.getDay() == 0 ) ?  7 : date.getDay();
}
alert( getLocalDay(date) );       // вторник, нужно показать 2


// ОПРЕДЕЛЕНИЕ ДАТЫ (СКОЛЬКО ДНЕЙ НАЗАД)
let date = new Date(2015, 0, 2);

function getDateAgo(date, past) {
  // pastMs = past * 1000 * 24 * 60 * 60;
  // let newDate = date;
  // return newDate -= pastMs;
  let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // ото извращение призвано клонировать дату исходя из исходной
  // или проще newDate = new Date(date);
  newDate.setDate(newDate.getDate() - past);
  return newDate;
}

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)


// ВЫЧИСЛЕНИЕ КОЛИЧЕСТВА ДНЕЙ В МЕСЯЦЕ
function getLastDayOfMonth(year, month) {
  let ourDate = new Date(year,month);
  let testDate = new Date(year, month + 1);
  testDate.setDate(0)
  let number = testDate.getDate();
 console.log(number);
}
getLastDayOfMonth(2012, 0) // = 29

// В УЧЕБНИКЕ:
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);  // передаем сразу нулевой день
  return date.getDate();
}
alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28

//СКОЛЬКО СЕГОДНЯ ПРОШЛО СЕКУНД?

const getSecondsToday = function(){
  let date = new Date();
  let testDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  console.log(date);
  console.log(testDate);
  return date-testDate;
}

//getSecondsToday(); //== 36000 // (3600 * 10)
console.log(getSecondsToday());


// функция редактирования даты
function formatDate(date) {
  let diff = new Date() - date; // разница в миллисекундах
  if (diff < 1000) { // меньше 1 секунды
    return 'прямо сейчас';
  }
  let sec = Math.floor(diff / 1000); // преобразовать разницу в секунды
  if (sec < 60) {
    return sec + ' сек. назад';
  }
  let min = Math.floor(diff / 60000); // преобразовать разницу в минуты
  if (min < 60) {
    return min + ' мин. назад';
  }
  // отформатировать дату
  // добавить ведущие нули к единственной цифре дню/месяцу/часам/минутам
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты
  // соединить компоненты в дату
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
alert( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"
alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"
// вчерашняя дата вроде 31.12.2016, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );



// ЗАДАЧИ НА SETINTERVAL И SETTIMEOUT

//задание интервала для перечисления цифр
//SETINTERVAL
let i = fromParametr = 10;
function printNumbers(from, to) {
  console.log(i);
  i++;
  if (i < to) {
    i++
  } else {
    clearInterval(numbers);
  }
}
let numbers = setInterval(printNumbers, 1000, fromParametr, 20);

// в учебнике происходит сам вызов функции и внутри интервал.
function printNumbers(from, to) {
  let current = from;
  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;

  }, 1000);
}
// использование:
printNumbers(5, 10);



function printNumbers(from, to) {
  let current = from;
  let timerId = setTimeout(function request() {
    console.log(current);
    if (current > to) {
    clearTimeout(timerId);
    return;  // без этого функция продолжает действовать
    }
    current++;
    timerId = setTimeout(request, 1000);

  }, 1000);
}
// использование:
printNumbers(5, 10);

// если же мы хотим чтобы функция запускалась сразу, без первоначальной задержки, то пишем так:
function printNumbers(from, to) {
  let current = from;
  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }
  go();  // первый запуск
  let timerId = setInterval(go, 1000);
}
printNumbers(5, 10);


//ВАРИАНТ ИЗ КОММЕНТОВ: элегантный


function printNumbers(from, to) {
  if (from <= to) {
      console.log(from);
      setTimeout(printNumbers, 1000, from + 1, to)
  }
}
printNumbers(5, 10);
