
//  возведение х в степень n . Функция возвращает х, если н=1, и умножает х на саму себя с уменьшенным н в ином случае.
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}

//простейший пример рекурсии. вывод от 1 до 10
var countFrom = function(n) {
  if (n === 0) { console.info('это еще не конец'); return; }
  console.log(n);  // Выводим число
  countFrom (n - 1); // Вызываем функцию с числом меньше предыдущего на единицу
  console.log(n);
}

countFrom(10);


//сумма зарплат во вложенных объектах

let company = { // тот же самый объект, сжатый для краткости
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Функция для подсчёта суммы зарплат
function sumSalaries(department) {
  if (Array.isArray(department)) { // случай (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // сумма элементов массива
  } else { // случай (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
    }
    return sum;
  }
}

alert(sumSalaries(company)); // 6700

//рекурсия может быть использования для брожения по ДОМ-дереву. Потом почитать


// СВЯЗАННЫЙ СПИСОК
// ОБЪЯВЛЕНИЕ
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

//разъединение и объединение списка
let secondList = list.next.next;
list.next.next = null;

list.next.next = secondList;

// ДОБАВЛЕНИЕ НОВОГО ЭЛЕМЕНТА В СПИСОК
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

list = { value: "new item", next: list };

// УДАЛЕНИЕ ИЗ СЕРЕДИНЫ СПИСКА. ПРОСТО ПЕРЕЗАПИСЫВАЕМ ССЫЛКУ
list.next = list.next.next;


// ЗАДАЧИ --------------------------------------------------------

// сумма от 1 до n обычным циклом
function sumTo(n) {
 let sum = 0;
for (let i=1; i <= n; i++) {
  sum = sum + i;
}
return sum;
}
alert(sumTo(100));



// сумма от 1 до n рекурсией
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}
alert( sumTo(100) );

 // СУММА ПО ФОРМУЛЕ АРИФМЕТИЧЕСКОЙ ПРОГРЕССИИ

function sumTo(n) {
  return (((1+n)/2)*(n));
}
alert( sumTo(100) );


// ФАКТОРИАЛ
function factorial(x) {
  if (x == 1) {
    return 1;
  } else {
    return x = x * factorial(x - 1);
  }
}

//сокращенная запись
// function factorial(n) {
//   return (n != 1) ? n * factorial(n - 1) : 1;
// }

alert( factorial(5) ); // 120

//ЧИСЛА ФИБОНАЧИ

function fib(x) {
  let mas = [1, 1];
  for (let i = 2; i <= x - 1; i++) {
    mas.push(mas[i-1] + mas[i - 2]);
  }
  return mas;
}

// function fib(n) {
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }
// console.log(fib(7));

//динамическое программирование снизу вверх.
// function fib(n) {
//   let a = 1;
//   let b = 1;
//   for (let i = 3; i <= n; i++) {
//     let c = a + b;
//     a = b;
//     b = c;
//   }
//   return b;
// }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757


// ВЫВОД СВЯЗАННОГО СПИСКА
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  while (list.next != null) {
    console.log(list.value);
    list = list.next;   // по какой то причине указатель двигается в цикле, но это никак не влияет на список в целом; в идеале заменять list на tmp (временный объект для проходки по списку)
  }
  console.log(list.value);
}

printList(list);
list = list.next;  // а так сдвигается..
console.log(list);

// РЕКУРСИВНЫЙ ВЫВОД
// function printList(list) {
//   if (list.next == null) {
//     console.log(list.value)
//   } else {
//     console.log(list.value);
//     printList(list.next);
//   }
// }

// // ВАРИАНТ ИЗ ЗАДАЧИ
// // function printList(list) {
// //   alert(list.value); // выводим текущий элемент
// //   if (list.next) {
// //     printList(list.next); // делаем то же самое для остальной части списка
// //   }
// // }



//  ОБРАТНЫЙ ВЫВОД СПИСКА
function printReverseList(list) {
  if (list.next) {
    printReverseList(list.next);
  }
  alert(list.value);
}


// для обратного вывода без рекурсии мы должны создать массив и потом по нему скатиться вниз
function printReverseList(list) {
  let arr = [];
  let tmp = list;
  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}
