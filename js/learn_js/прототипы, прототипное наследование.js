// ОБЪЯВЛЕНИЕ ANIMAL ПРОТОТИПОМ RABBIT

let animal = {
    eats: true
  };
  let rabbit = {
    jumps: true
  };

  rabbit.__proto__ = animal;
  alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true

// ОПИСАНИЕ В САМОМ ОБЪЕКТЕ
let animal = {
    eats: true,
    walk() {
      alert("Animal walk");
    }
  };
  let rabbit = {
      ass : 'big',
    jumps: true,
    __proto__: animal
  };
  // walk взят из прототипа
  rabbit.walk(); // Animal walk

  // ЦЕПОЧКИ ПРОТОТИПОВ
  let animal = {
    ass : 'big', // берется сначала у объекта longEar, а если этого свойства там нет, то отсюда
    eats: true,
    walk() {
      alert(`Animal walk and has ${this.ass} ass`); // так тоже рабоатает
    }
  };
  let rabbit = {
    jumps: true,
    __proto__: animal
  };
  let longEar = {
    earLength: 10,
    __proto__: rabbit,
    ass : 'small'
  };
  // walk взят из цепочки прототипов
  longEar.walk(); // Animal walk
  rabbit.walk();  //
  alert(longEar.jumps); // true (из rabbit)
  console.log(longEar.ass);
  console.log(longEar);


  // ЕСЛИ ЕСТЬ СХОЖИЕ МЕТРДЫ, ТО ОНИ НЕ ОТНАСЛЕДУЮТСЯ
  let animal = {
    eats: true,
    walk() {
      /* этот метод не будет использоваться в rabbit */
    }
  };
  let rabbit = {
    __proto__: animal
  };
  rabbit.walk = function() {
    alert("Rabbit! Bounce-bounce!");
  };
  rabbit.walk(); // Rabbit! Bounce-bounce!

  // КАК РАБОТАЕТ ДЛЯ THIS
  let user = {
    name: "John",
    surname: "Smith",
    set fullName(value) {
      [this.name, this.surname] = value.split(" ");
    },
    get fullName() {
      return `${this.name} ${this.surname}`;
    }
  };
  let admin = {
    __proto__: user,
    isAdmin: true
  };
  alert(admin.fullName); // John Smith (*)
  // срабатывает сеттер!
  admin.fullName = "Alice Cooper"; // присваевается через this объекту перед точкой, то есть для объекта
  console.log(admin.name); // Alice
  console.log(admin.surname); // Cooper
  console.log(user.name);

  // МЕТОДЫ ANIMAL НЕ МЕНЯЮТСЯ ПРИ РАБОТЕ С RABBIT
let animal = {
    walk() {
      if (!this.isSleeping) {
        alert(`I walk`);
      }
    },
    sleep() {
      this.isSleeping = true;
    }
  };
  let rabbit = {
    name: "White Rabbit",
    __proto__: animal
  };
  // модифицирует rabbit.isSleeping
  rabbit.sleep();
  alert(rabbit.isSleeping); // true
  alert(animal.isSleeping); // undefined (нет такого свойства в прототипе)

  // ЦИКЛ FOR…IN - ПРОХОДИТ В ТОМ ЧИСЛЕ ПО УНАСЛЕДОВАННЫМ КЛЮЧАМ, А OBJECT.KEYS - ТОЛЬКО ПО ВНУТРЕННИМ
  let animal = {
    eats: true
  };
  let rabbit = {
    jumps: true,
    __proto__: animal
  };
  // Object.keys возвращает только собственные ключи
  alert(Object.keys(rabbit)); // jumps
  // for..in проходит и по своим, и по унаследованным ключам
  for(let prop in rabbit) alert(prop); // jumps, затем eats

// фильтрация свойств на свои/чужие
let animal = {
    eats: true
  };
  let rabbit = {
    jumps: true,
    __proto__: animal
  };
  for(let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);
    if (isOwn) {
      alert(`Our: ${prop}`); // Our: jumps
    } else {
      alert(`Inherited: ${prop}`); // Inherited: eats
    }
  }

// ПРОВЕРКА НАСЛЕДОВАНИЯ
let arr = [1, 2, 3];
// наследует ли от Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true
// затем наследует ли от Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true
// и null на вершине иерархии
alert( arr.__proto__.__proto__.__proto__ ); // null

// ПРИМЕНЕНИЕ МОДИФИКАЦИИ ВСТРОЕННОГО ПРОТОТИПА ДЛЯ ПОЛИФИЛОВ
if (!String.prototype.repeatTest) { // Если такого метода нет
    // добавляем его в прототип
    String.prototype.repeatTest = function(n) {
      // повторить строку n раз
      // на самом деле код должен быть немного более сложным
      // (полный алгоритм можно найти в спецификации)
      // но даже неполный полифил зачастую достаточно хорош для использования
      return new Array(n + 1).join(this);
    };
  }
  alert( "La".repeatTest(3) ); // LaLaLa

// ЗАИМСТВОВАНИЕ СВОЙСТВ У ПРОТОТИПОВ
  let obj = {
    0: "Hello",
    1: "world!",
    length: 2,
  };
  obj.join = Array.prototype.join;
  alert( obj.join(',') ); // Hello,world!

// БОЛЕЕ СОВРЕМЕННЫЕ МЕТОДЫ РАБОТЫ С ПРОТОТИПАМИ
  let animal = {
    eats: true
  };
  // создаём новый объект с прототипом animal
  let rabbit = Object.create(animal);
  alert(rabbit.eats); // true
  alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
  Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}

  // СОЗДАНИЕ ОБЪЕКТА С ДОБАВЛЕНИЕМ ДЕСКРИПТОРОВ
  let animal = {
    eats: true
  };
  let rabbit = Object.create(animal, {
    jumps: {
      value: true
    }
  });
  alert(rabbit.jumps); // true

  // КЛОН OBJ C ТЕМ ЖЕ ПРОТОТИПОМ (С ПОВЕРХНОСТНЫМ КОПИРОВАНИЕМ СВОЙСТВ)
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

// СОЗДАНИЕ ОБЪЕКТА БЕЗ ПРОТОТИПА ОБЪЕКТА. ХУЙНЯ КАКАЯ ТО
let obj = Object.create(null);
let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";
alert(obj[key]); // "some value"


// прототипы через new
let animal = {
  eats: true
};
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
console.log(rabbit);
alert( rabbit.eats ); // true

// ПРОТОТИП NEW ФУНКЦИИ - ЕЕ КОНСТРУКТОР
function Rabbit() {}
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }
let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}
alert(rabbit.constructor == Rabbit); // true (свойство получено из прототипа)

// ЗАДАЧИ ------------------------------------
// ЦЕПОЧКА ПРОТОТИПОВ----------------------
 let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Этот хомяк нашёл еду
speedy.eat("apple");
alert( speedy.stomach ); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
alert( lazy.stomach ); // apple


// ХОМЯКИ КУШАЮТ  ----------------------------------
let hamster = {
    stomach: [],
    eat(food) {
      //this.stomach.push(food);  //так наедятся оба хомяка, потому что движок будет ИСКАТЬ массив stomach для пуша вглубь прототипа
      this.stomach = [food];  // а так ничего искать не нужно, поэтому значение сразу присвоится к определенному хомяку
    }
  };
  let speedy = {
    stomach: [], // лучше всего создавать требуемые свойства в самом объекте
    __proto__: hamster
  };
  let lazy = {
    stomach: [],
    __proto__: hamster
  };
  // Этот хомяк нашёл еду
  speedy.eat("apple");
  alert( speedy.stomach ); // apple
  // У этого хомяка тоже есть еда. Почему? Исправьте
  alert( lazy.stomach ); // apple

  // ДОБАВЛЕНИЕ В ПРОТОТИП ФУНКЦИЙ ФУНКЦИИ ВЫЗОВА ЕЕ ЧЕРЕЗ N СЕКУНД

  Function.prototype.defer = function(n) {
    return setTimeout(this, n);
  };
  function f() {
    alert("Hello!");
  }
  f.defer(3000); // выведет "Hello!" через 1 секунду


// ПЕРЕДАЧА ПАРАМЕТРОВ В ФУНКЦИЮ ВЫЗОВА -------------

// решение в учебнике. жопа непонятная
// Function.prototype.defer = function(ms) {
//   let f = this;
//   return function(...args) {
//     setTimeout(() => f.apply(this, args), ms);
//   }
// };

// решение в комментах.  так явно понятней
Function.prototype.defer = function(ms) {
  return (...ass) => setTimeout(this, ms, ...ass)
  };

// check it
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.

// этот же вариант с интересной особенностью
Function.prototype.defer = function(ms) {
  return (...args) => (setTimeout(this, ms, ...args), undefined);
  }
//Я использовал свойство оператора запятой - из выражения с запятыми возвращается последнее. Таким образом эта декорирующая функция ставит setTimeout, и возвращает не id таймера, а undefined. Согласен, может быть это лишнее, но все же я считаю, что лучше скрыть детали внутренней реализации для пользователей, ведь ему незачем в дальнейшем управлять этим таймером.


// ДОБАВЛЕНИЕ МЕТОДА TOSTRING ДЛЯ НУЛЕВОГО ОБЪЕКТА ------------------
let dictionary = Object.create(null, {
  toString: { // определяем свойство toString
    value() { // значение -- это функция
      return Object.keys(this).join();
      //return Object.prototype.toString(this);
    }
  }
});
dictionary.apple = "Apple";
dictionary.__proto__ = "test";
// apple и __proto__ выведены в цикле
for(let key in dictionary) {
  alert(key); // "apple", затем "__proto__"
}
// список свойств, разделённых запятой, выведен с помощью toString
alert(dictionary); // "apple,__proto__"

// вариант из комментов - добавить дескриптор отдельно
Object.defineProperty(dictionary, "toString", {
  value: function () {
    return `${Object.keys(this)}`;
  },
});


//  ВЫЗОВЫ ПРОТОТИПОВ-------------------------------------
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined


//ЗАДАЧА СОЗДАНИЕ ОБЪЕКТА НА БАЗЕ ДРУГОГО ---------------
function CreateObj(name) {
   this.name = name,
    this.surname = 'karpov'
}
CreateObj.prototype.sayHi = function() {
  console.log(this);
};
//User.prototype = {}; // если мы уничтожим прототип, obj2 не найдет его у obj, и возьмет предыдущий прототип - Object
let obj = new CreateObj('vanya');
console.log(obj);
obj.sayHi();

let obj2 = new obj.constructor('hi');
console.log(obj2);
obj2.sayHi();
