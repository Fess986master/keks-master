// import './util.js';  // вспомогательные функции.  используем в data.js для генерации случайных объявлений
// import './data.js';
// import './popup.js';  // всплывающие подсказки для объявлений поблизости
// import './form.js';  // работа с формой
// import './map.js';  // работа с картой
// import './api.js';  // работа с сетью
// import './photo.js';  // работа с аватарками и превьюшками

import {
  initMap, rerenderMap
} from './map.js';
import {
  disableForms, setValidation, allFiltersChange
} from './form.js';

try {
  disableForms();
  initMap();
  setValidation();
  allFiltersChange(rerenderMap);
} catch (err) {
  alert(`ошибка загрузки карты ${err}`);
}

