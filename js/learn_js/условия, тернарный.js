if (10 >= 9) {
  console.log('выполнение условия')
} else {
  console.log('не выполнение условия')
}

if (10 != 9) {  // оператор неравенства
  console.log('выполнение условия')
} else {
  console.log('не выполнение условия')
}

function testStrict(val) {  // строгое равенство проверяет в том числе и тип данных. Если оставим ==  - то будет выводить прямое условие
  if (val === 7) {
    return "Equal";
  }
  return "Not Equal";
}
testStrict('7');

function testLogicalAnd(val) {
  if (val<=50 && val>=25) {   // оператор "И"
      return "Yes";
  }  // else  не обязательно прописывать, если условие одно
  return "No";
}
testLogicalAnd(10);

function testLogicalOr(val) {
  if (val > 20 || val < 10) {  // оператор "ИЛИ"
    return "Outside";
  }
  return "Inside";
}
testLogicalOr(15);

function testElseIf(val) {
  if (val > 10) {
    return "Greater than 10";
  }
  else if (val < 5) {  //  если нескольно элзов, то пишем так. Порядок имеет значение, так как функция закончит свое выполнение, когда будет встречено первое соответствие и первый ретерн
    return "Smaller than 5";
  } else {
  return "Between 5 and 10";
  }
}
console.log(testElseIf(7));

function caseInSwitch(val) {
  var answer = "";
  switch(val) {  // перебор точных вариантов
       case 1:
       case 2:
      answer = "alpha & beta"
      break; // выполнение между кейсами идет до брейка. Условия можно группировать
       case 3:
      answer = "gamma"
      break;
       case 4:
      answer = "delta"
      break;
      default :   //  если значение не равно перебранным выше, то используется это
      answer = "ass";
    break;
  }
  return answer;
}
caseInSwitch(10);

function isEqual(a,b) {
  return a === b;   //  возвращение булиановского типа
}
isEqual(1,1);

function abTest(a, b) {
  if (a < 0 || b < 0) {
    return undefined;  // функция завершается на первом ретерне
  }
  return Math.round(Math.pow(Math.sqrt(a) + Math.sqrt(b), 2));
}
abTest(2,2);

let accessAllowed = 15 > 18 ? true : false;   //тернарный оператор. Сначала проверяется условие до ? а потом если да, то выполняется то что до : , иначе то что после
console.log(accessAllowed);

let age = 15;  // проверка возвраста при помощи тернарного оператора
let message = (age < 3) ? 'Здравствуй, малыш!' :
  (age < 18) ? 'Привет!' :
  (age < 100) ? 'Здравствуйте!' :
  'Какой необычный возраст!';
  console.log(message);

  // если результат не присваивается переменной, то лучше использовать if, так как читаемость кода плохая

// использование ИЛИ в качестве первого трушного варианта. Если бы все были фэлс, то присвоилось бы аннеймед, так как оно последнее в списке.
  let currentUser = null;
let defaultUser = "John";
let name = currentUser || defaultUser || "unnamed";
alert( name ); // выбирается "John" – первое истинное значение

let x;  //пример вычисления в зависимости от первого значения. Но лучше использовать if для лучшей читаемости кода
false || (x = 1);
alert(x); // 1

alert( !!"non-empty string" ); // true !!- булевское преобразование

let height = 0;
alert(height || 100); // 100
alert(height ?? 100); // 0   Оператор объединения с null '??'. В отличии от ИЛИ, для которого 0 - означает false - реально выдаст определенное значение.

let height = null;
let width = null;
// важно: используйте круглые скобки, так как приоритет у ?? низкий
let area = (height ?? 100) * (width ?? 50);
alert(area); // 5000

let a;
a ??= 1 // a = 1
a ??= 2 // a = 1

let a = "1";
let b = 0;

switch (+a) {
  case b + 1:
    alert("Выполнится, т.к. значением +a будет 1, что в точности равно b+1");
    break;
  default:
    alert("Это не выполнится");
}
