// вспомогательные функции.  используем в data.js для генерации случайных объявлений

let randomNumber, randomFloatingNumber;

const random = function (min, max) {
  return randomNumber = Math.ceil(Math.random() * (max - min + 1) + min - 1);
}

const randomFloating = function (min, max, n) {
  return randomFloatingNumber = Math.ceil(Math.random() * (max - min) + min - 1) + +Math.random().toFixed(n);
}

export { random, randomFloating };

