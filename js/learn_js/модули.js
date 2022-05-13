//ПРИМЕР ИМПОРТА/ЭКСПОРТА
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
// 📁 main.js
import {sayHi} from './sayHi.js';
alert(sayHi); // function...
sayHi('John'); // Hello, John!

// IMPORT.META - ОБЪЕКТ , КОТОРЫЙ СОДЕРЖИТ ИНФОРМАЦИЮ О ТЕКУЩЕМ МОДУЛЕ
<script type="module">
  alert(import.meta.url); // ссылка на html страницу для встроенного скрипта
</script>
