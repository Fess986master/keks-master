// ФУНКЦИЯ-ГЕНЕРАТОР

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
// "функция-генератор" создаёт объект "генератор"
let generator = generateSequence();
console.log(generator); // [object Generator]


// ПЕРЕБОР ЗНАЧЕННИЙ. РАБОТАЕТ ПОКА НЕ БУДЕТ DONE = TRUE
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
let generator = generateSequence();
let one = generator.next();
alert(JSON.stringify(one)); // {value: 1, done: false}
let two = generator.next();
alert(JSON.stringify(two)); // {value: 2, done: false}
let three = generator.next();
alert(JSON.stringify(three)); // {value: 3, done: true}


// ПЕРЕБОР ПРИ ПОМОЩИ FOR..OF . ЕСТЬ КОСЯК - ПОСЛЕДНЕЕ ЗНАЧЕНИЕ НЕ ВЫВОДИТСЯ
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
let generator = generateSequence();
for(let value of generator) {
  alert(value); // 1, затем 2
}

// замена  return  на yield для полного вывода значений
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
let generator = generateSequence();
for(let value of generator) {
  alert(value); // 1, затем 2, затем 3
}

// ТАК КАК ЭТО ПЕРЕБИРАЕМЫЙ ОБЪЕКТ - МЫ МОЖЕМ ПОЛЬЗОВАТЬСЯ ОПЕРАТОРАМИ РАСШИРЕНИЯ
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
let sequence = [0, ...generateSequence()];
alert(sequence); // 0, 1, 2, 3


// ГЕНЕРАТОР ПОСЛЕДОВАТЕЛЬНОСТИ ЧИСЕЛ ПРИ ПОМОЩИ ГЕНЕРАОТОРА
let range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};
alert( [...range] ); // 1,2,3,4,5


// ГЕНЕРАТОР С КОМПОЗИЦИЕЙ (ВЛОЖЕННОСТЬЮ)
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57);
  //  for (let i = 48; i <= 57; i++) yield i;
  // A..Z
  yield* generateSequence(65, 90);
  //for (let i = 65; i <= 90; i++) yield i;
  // a..z
  yield* generateSequence(97, 122);
  // for (let i = 97; i <= 122; i++) yield i;
}
let str = '';
let genetatjr = [...generatePasswordCodes()]; // так мы получаем просто последовательность цифр из генератора
console.log(genetatjr);
for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);  // получаем строку с символами
}
console.log(str); // 0..9A..Za..z



// ЗАДАЧА ПСЕВДОСЛУЧАЙНЫЙ ГЕНЕРАТОР ---------------------

//МОЙ ВАРИАНТ С ОГРАНИЧЕНИЕМ ЗНАЧЕНИЙ, В ДАННОМ ПРИМЕРЕ 5
function* pseudoRandom(seed) {
  let previous = seed;
  for (let i = 1; i <= 5; i++) {
    next = previous * 16807 % 2147483647
    yield next;
    previous = next;
}
};
let generator = pseudoRandom(1);
alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073


// ВАРИАНТ ИЗ ЗАДАЧИ С БЕСКОНЕЧНЫМ ЦИКЛОМ, ЕСЛИ МЫ СРАЗУ ХОТИМ СМОТРЕТЬ ВСЕ ЗНАЧЕНИЯ
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647
    yield value;
  }
};
let generator = pseudoRandom(1);
let gen = [...pseudoRandom(1)];
console.log(gen);
alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
