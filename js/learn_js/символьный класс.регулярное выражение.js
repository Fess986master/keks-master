// Инициализация
const testString = "Ada 3 Lovelace and Charles Babbage designed the first computer and. the software 69 Ada bulba  that would have run on 5 it.";

// Пример
const expressionToGetSoftware = /Ada/gi;  //g-глобально ищем по всему документу i-отключает зависимость от регистра. Создастся массив со всеми найденными словами
const softwareCount = testString.match(expressionToGetSoftware);  //вызов регулярного выражения
console.log(softwareCount);
console.log(testString.match(/\d+/g));  //d - поиск чисел. Знак "+""  - разрешает склеивать цифры в числа, иначе будет массив из одних цифр
console.log(testString.match(/\s+/g));  //s - поиск пробелов
console.log(testString.match(/\S+/g));  //S - инвертация. поиск НЕ пробелов
console.log(testString.match(/\w+/g));  //w - поиск слов
const notWorld = /\W+/g;  // можно объявлять оператор в константе
console.log(testString.match(notWorld));
console.log(testString.match(/[a-e]/gi));  // поиск по диапазону
// var re = /смотри (главу \d+(\.\d)*)/i;   -  можно писать сложные запросы, но пока непонятно как. Ругается на скобки
// console.log(testString.match(re);
console.log(testString.match(/.b/gi));  // точка заменяет любой символ
console.log(testString.match(/\d+/g).join());  //объединение в строку
console.log(testString.match(/\d+/g).join(' '));  // строка с рпзделителем-пробелом
