// ЗАДАЧИ ИЗ ПРИМЕРОВ. В САМОЙ СТАТЬЕ ПУТАННО ЗАПИСАНО ПИЗДЕЦ



// АДСКАЯ ПИРАМИДА ВЫЗОВОВ
// если нужно подряд много скриптов загружать
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...и так далее, пока все скрипты не будут загружены (*)
          }
        });
      }
    })
  }
});

// возможность заменить адскую пирамиду без супер вложенности. Но при этом используется много новых функций что тоже не очень хорошо

loadScript('1.js', step1);
function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}
function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}
function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...и так далее, пока все скрипты не будут загружены (*)
  }
};


// ПРИМЕР РАБОТЫ КОЛБЕКОВ

function foo(callback1) {
  // Есть что-то очень долгое, например супер сложное вычисление.
  // Вопрос, как нам выполнить код после того как это вычисление закончится и использовать результат этого действия?
  let b = 1000000000
  let result = 0
  for (let i = 0; i <= b; i++) {
      result = 'result'
  }
  // И здесь появляется наш Callback! Он подождет пока вычисления в цикле закончатся и выведет наш результат в консоль.
  console.log('1');
  callback1(result);
  console.log('2');
}
console.log('3');   // покажется раньше всего
foo(function(res) {
  console.log(res);
})
console.log('4');  // запустится после выполнения функции


//  БЕЗ КОЛБЕКА
function foo() {  // без колбека
  let b = 1000000000
  let result = 0
  for (let i = 0; i <= b; i++) {
      result = 'result'
  }
  console.log('1');
}
foo();
console.log('2');

// обработка ошибок
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));
  document.head.append(script);
}

loadScript('/my/script.js', function(error, script) {
  if (error) {
    console.log('error');
  } else {
    console.log('error');
  }
});



// ПРОМИСЫ
let x = 10;
let promise = new Promise(function(resolve, reject) {
  x += 10;
  setTimeout(() => resolve(10 / 0), 1000);
  setTimeout(() => reject(new Error("Whoops!")), 1000);

});
// REJECT ЗАПУСТИТ ВТОРУЮ ФУНКЦИЮ, ПЕРЕДАННУЮ В .THEN
console.log(promise);
promise.then(
  result => {
    console.log('result');
    console.log(result);
    console.log(x);  // внешние переменные работают
  }, // не будет запущена
  error => console.log(error) // выведет "Error: Whoops!" спустя одну секунду
);

// ЕСЛИ НУЖНО ТОЛЬКО ВЫВЕСТИ ФУНКЦИЮ
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});
promise.then(console.log); // выведет "done!" спустя одну секунду. Непонятно почему это сработает

// CATCH. ВЫЗОВ .CATCH(F) – ЭТО СОКРАЩЁННЫЙ, «УКОРОЧЕННЫЙ» ВАРИАНТ .THEN(NULL, F).
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Ошибка!")), 1000);
});
// .catch(f) это то же самое, что promise.then(null, f)
promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду


new Promise((resolve, reject) => {
  setTimeout(() => resolve("result"), 2000)
})
  .finally(() => alert("Промис завершён"))
  .then(result => alert(result)); // <-- .then обработает результат


 //ЦЕПОЧКИ ПРОМИСОВ
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000); // (*)
  }).then(function(result) { // (**)
    console.log(result); // 1
    return result * 2;   // дает новое значение новому промису. Обязательно нужен return, иначе новый промис будет со значением underfind
  }).then(function(result) { // (***)
    console.log(result); // 2
    return result * 2;
  }).then(function(result) {
    console.log(result); // 4
    return result * 2;
  });


// тесты со значением цепочек
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000); // (*)
  }).then(function(result) { // (**)
    console.log(result); // 1
     result * 2;
  }).then(function(result) { // (***)
    console.log(result); // underfind, так как в прошлом не было return
     return result * 2;
  }).then(function(result) {
    console.log(result); // Nan , так как underfind * 2 = Nan
    return 20;
  }).then(function(result) {
    console.log(result); // 20
  })



// так асинхронность работать не будет
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000); // (*)
  }).then(function(result) { // (**)
    console.log(result); // 1
    return setTimeout(() => console.log('ass'), 1000);
    //return result * 2;   // дает новое значение новому промису. Обязательно нужен return, иначе новый промис будет со значением underfind
  }).then(function(result) { // (***)
    console.log(result); // 2
    return setTimeout(() => console.log('ass'), 1000);
    //return result * 2;
  }).then(function(result) {
    console.log(result); // 4
    return setTimeout(() => console.log('ass'), 1000);
    //return result * 2;
  });

// АСИНХРОННАЯ ЦЕПОЧКА ПРОМИСОВ
// возвращаем вместо result - новый промис который и будет выполняться
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  }).then(function(result) {
    alert(result); // 1
    return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  }).then(function(result) { // (**)
    alert(result); // 2
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  }).then(function(result) {
    alert(result); // 4
  });


// МОДИФИЦИРОВАННЫЙ ЗАГРУЗЧИК СКРИПТОВ. АСИНХРОННАЯ ЗАГРУЗКА
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = src;
      console.log(script);
      //return resolve(script);
      return setTimeout(() => resolve(script), 1000)
    });
  }
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))



// НЕ ОПТИМАЛЬНАЯ ЦЕПОЧКА со вложенностью. выше - лучше. единственный плюс - вложенные функции видят переменные предков
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = src;
      console.log(script);
      //return resolve(script);
      return setTimeout(() => resolve(script), 2000)
    });
  }
  loadScript("/article/promise-chaining/one.js").then(() => {
    loadScript("/article/promise-chaining/two.js").then(script => {
      loadScript("/article/promise-chaining/three.js")
    });
  });


// объекты, поддерживающие цепочки
  class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      alert(resolve); // function() { native code }
      // будет успешно выполнено с аргументом this.num*2 через 1 секунду
      setTimeout(() => resolve(this.num * 2), 1000); // (**)
    }
  }
  new Promise(resolve => resolve(1))
    .then(result => {
      return new Thenable(result); // (*)
    })
    .then(alert); // показывает 2 через 1000мс

// ЛОАДЕР JSON С ГИТХАБА
    function loadGithubUser(name) {
      return fetch(`https://api.github.com/users/${name}`)
        .then(response => response.json());
    }
    function showAvatar(githubUser) {
      return new Promise(function(resolve, reject) {
        resolve(githubUser);
        console.log(githubUser);
      });
    }
    loadGithubUser('Fess986master')
      .then(showAvatar)

      // ЛОАДЕР С ГИТХАБА ПОЛЬЗОВАТЕЛЯ С АВАТАРОМ
      function loadJson(url) {
        return fetch(url)
          .then(response => response.json());
      }
      function loadGithubUser(name) {
        return fetch(`https://api.github.com/users/${name}`)
          .then(response => response.json());
      }
      function showAvatar(githubUser) {
        return new Promise(function(resolve, reject) {
          let img = document.createElement('img');
          img.src = githubUser.avatar_url;
          img.className = "promise-avatar-example";
          document.body.append(img);
          setTimeout(() => {
            img.remove();
            resolve(githubUser);
          }, 3000);
        });
      }
      // Используем их:
      loadJson('/article/promise-chaining/user.json')
        .then(user => loadGithubUser(user.name))
        .then(showAvatar)
        .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
        // ...


// PROMISE.ALL - ПАРАЛЛЕЛЬЛНАЯ ЗАГРУЗКА ПРОМИСОВ
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3
// каждый промис даёт элемент массива


// ТРЮК С ОБОРАЧИВАНИЕМ ССЫЛОК ЧЕРЕЗ МЕТОД MAP
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];
// Преобразуем каждый URL в промис, возвращённый fetch
let requests = urls.map(url => fetch(url));
// Promise.all будет ожидать выполнения всех промисов
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));

  // ОБРАБОТКА ПОСЛОЖНЕЕ
  let names = ['iliakan', 'remy', 'jeresig'];
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));
Promise.all(requests)
  .then(responses => {
    // все промисы успешно завершены
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
    }
    return responses;
  })
  // преобразовать массив ответов response в response.json(),
  // чтобы прочитать содержимое каждого
  .then(responses => Promise.all(responses.map(r => r.json())))
  // все JSON-ответы обработаны, users - массив с результатами
  .then(users => users.forEach(user => alert(user.name)));


  // ОШИБКА В ПРОМИСЕ
  Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).catch(alert); // Error: Ошибка!


  // Promise.allSettled - обработка с возможными ошибками
  let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
  ];
  Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
      results.forEach((result, num) => {
        if (result.status == "fulfilled") {
          alert(`${urls[num]}: ${result.value.status}`);
        }
        if (result.status == "rejected") {
          alert(`${urls[num]}: ${result.reason}`);
        }
      });
    });


//  PROMISE.RACE ПЕРВЫЙ ВЫПОЛНЕННЫЙ ПРОМИС
    Promise.race([
      new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
      new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(alert); // 1


    // ПРОМИСИФИКАЦИЯ КОДА
   // promisify(f, true), чтобы получить массив результатов
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // наш специальный колбэк для f
        if (err) {
          return reject(err);
        } else {
          // делаем resolve для всех results колбэка, если задано manyArgs
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};
// использование:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)


// ЦЕПОЧКА ПОСЛЕДОВАТИЛЬНЫХ ПРОМИСОВ
// начало цепочки
let chain = Promise.resolve();  // Использование Promise.resolve() как начала асинхронной цепочки – очень распространённый приём.
let results = [];
// в цикле добавляем задачи в цепочку
urls.forEach(function(url) {
  chain = chain
    .then(() => httpGet(url))
    .then((result) => {
      results.push(result);
    });
});
// в конце — выводим результаты
chain.then(() => {
  alert(results);
});


// ASYNC  ФУНКЦИЯ ВСЕГДА ВОЗВРАЩАЕТ ПРОМИС
async function f() {
  return 1;
}
f().then(alert); // 1


// РАБОТА AWAIT
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });
  let result = await promise; // будет ждать, пока промис не выполнится (*)
  alert(result); // "готово!"
}
f();


// ОБРАБОТКА ОШИБОК
async function f() {
  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    alert(err);
  }
}
f();



// МОЖНО ПОЙМАТЬ ОШИБКУ ПОСЛЕ ВЫХОДА ИЗ ФУНКЦИИ
async function f() {
  let response = await fetch('http://no-such-url');
}
// f() вернёт промис в состоянии rejected
f().catch(alert); // TypeError: failed to fetch // (*)

// МОЖНО ОБЕРНУТЬ В АНОНИМНУЮ АСИНХРОННУЮ ФУНКЦИЮ, ЕСЛИ МЫ ХОТИМ ЧТОБЫ AWAIT РАБОТАЛ
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();


// задача загрузки аватарки при помощи async/await - выглядит гораздо проще и логичнее

async function showAvatar() {
  // запрашиваем JSON с данными пользователя
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  // запрашиваем информацию об этом пользователе из github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();
  // отображаем аватар пользователя
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);
  // ждём 3 секунды и затем скрываем аватар
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  img.remove();
  return githubUser;
}
showAvatar();



// ЗАДАЧА ЗАГРУЗКИ JSON С ОБРАБОТКОЙ ОШИБОК---------------
async function loadJson(url) {
  try {
  let response = await fetch(url);
  let user = await response.json();
  } catch {
    // console.log("Error: 404")
    throw new Error('Error: 404');
  }
  return user;
// в решении из учебника - идет проверка response.status == 200, а у меня проверка внутренними механизмами
//   let response = await fetch(url); // (2)
//   if (response.status == 200) {
//     let json = await response.json(); // (3)
//     return json;
//   }
//   throw new Error(response.status);
// }
}
loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404


// ЗАДАЧА ЗАГРУЗКИ НАСТОЯЩЕГО ПОЛЬЗОВАТЕЛЯ С ГИТХАБА С ОБРАБОТКАМИ ОШИБОК -------------------

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}
async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}
// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {
  let user;
  while(true) {
    let name = prompt("Введите логин?", "iliakan");
    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // ошибок не было, выходим из цикла
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // после alert начнётся новая итерация цикла
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
      } else {
        // неизвестная ошибка, пробрасываем её
        throw err;
      }
    }
  }
  alert(`Полное имя: ${user.name}.`);
  return user;
}
demoGithubUser();

// задача вызова асинхронной функции из обычной

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 10;
}
function f() {
   wait().then(result => alert(result));
}

f();


// ЗАДАЧА С АНИМИРОВАННЫМ КРУГОМ----------------------

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <style>
    .message-ball {
      font-size: 20px;
      line-height: 200px;
      text-align: center;
    }
    .circle {
      transition-property: width, height, margin-left, margin-top;
      transition-duration: 2s;
      position: fixed;
      transform: translateX(-50%) translateY(-50%);
      background-color: red;
      border-radius: 50%;
    }
  </style>
</head>

<body>
  <button onclick="go()">Click me</button>
  <script>
    function showCircle(cx, cy, radius) {
      return new Promise(resolve => {
        let div = document.createElement('div');
        div.style.width = 0;
        div.style.height = 0;
        div.style.left = cx + 'px';
        div.style.top = cy + 'px';
        div.className = 'circle';
        document.body.append(div);
        setTimeout(() => {
          div.style.width = radius * 2 + 'px';
          div.style.height = radius * 2 + 'px';
          resolve(div);
          // div.addEventListener('transitionend', function handler() {
          //   div.removeEventListener('transitionend', handler);
          //   resolve(div);
          // });
        });
      });
    }

    function go() {
      showCircle(150, 150, 100).then(div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
      });
    }

  </script>
</body>
</html>


// вызов таймаута через промисы
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}
delay(1000).then(() => alert('выполнилось через 3 секунды'));

// в учебнике:
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('выполнилось через 3 секунды'));
