const myArray = [];   //заполнение массива через цикл
for (let i = 1; i <= 9; i += 2) {
  myArray.push(i);
}

for (let i = 0; i < myArray.length; i++) {   //перебор массива
  console.log(myArray[i]);
}

const arr = [   //перебор значений двумерного массива
  [8,10], [13,44], [55,66]
  ];
  for (let i=0; i < arr.length; i++) {
     for (let j=0; j < arr[i].length; j++)    {
       console.log(arr[i][j]);
     }
  }

let i = 0;  //  i указывается до самого цикла
while (i<5) {
  console.log(myArray[i]);
  i++;
}

let i = 3;
while (i) alert(i--);  //если одна строка в теле цикла то можно без скобок

let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);   // используется когда мы хотим хотя бы одного выполнения цикла

let i = 0;
for (; i < 3;) {  // можно пропустить начала цикла и итерацию, но нужно оставлять ; иначе будет ошибка синтаксиса
  alert( i++ );
}

let sum = 0;
while (true) {
  let value = +prompt("Введите число", '');  //преобразование значения ввода в цифру
  if (!value) break; // прерывание цикла если введена не цифра
  sum += value;
}
alert( 'Сумма: ' + sum );

for (let i = 0; i < 10; i++) {
  // если true, пропустить оставшуюся часть тела цикла
  if (i % 2 == 0) continue;
  alert(i); // 1, затем 3, 5, 7, 9
}

outer: for (let i = 0; i < 3; i++) {  //выход из вложенных циклов по метке
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Значение на координатах (${i},${j})`, '');
    // если пустая строка или Отмена, то выйти из обоих циклов
    if (!input) break outer; // (*)
    // сделать что-нибудь со значениями...
  }
}

alert('Готово!');

var myDog = {
  "name": "Fess",
  "legs": 3,
  "tails": 1,
  "friends": ["me",2]
};

for (let item in myDog) {   //цикл перебора свойств массива  item - ключ
  console.log(item);
  console.log(myDog[item]);
};


let n = 10;
for (let i = 2; i <= n; i++) {
  let flag = false;
  for (let j =2; j<i; j++) {
    if (i % j == 0) {
      flag = true;

    }
  }
  if (!flag) alert(i);
  flag = false;
}
