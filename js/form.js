import {
  sendData
} from './api.js';
import {
  clearImages,
  adFormAvatarChange,
  adFormPhotoChange
} from './photo.js';

console.log('form is download');

// константы
const CUSTOMMINLENGTH = 5;
const CUSTOMMAXLENGTH = 25;

const MinPrices = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
}

const MaxPrices = {
  'palace': 100000,
  'flat': 10000,
  'house': 50000,
  'bungalow': 10000,
}

const roomGuestsNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
}

// объекты полей формы объявления
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const adress = adForm.querySelector('#address');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const templateSuccess = document.querySelector('#success').content;
const messageSuccess = templateSuccess.querySelector('.success');
const buttonSubmit = adForm.querySelector('.ad-form__submit');
const buttonReset = adForm.querySelector('.ad-form__reset');

// объекты полей фильтров объявлений
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
const filterGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelector('#housing-features');
const filterFeaturesInputs = filterForm.querySelectorAll('input');

// ФИЛЬТРАЦИЯ ОБЪЯВЛЕНИЙ В СООТВЕТСТВИИ С УСТАНОВЛЕННЫМИ ФИЛЬТРАМИ
// фильтрация объявлений по типу
const filterTypeCheck = (offer) => {
  // console.log(offer);
  if (((offer.offer.type === filterType.value) || (filterType.value == 'any'))) {
    return true;
  } else {
    return false;
  }
}

// фильтрация объявлений по цене
const filterPriceCheck = (offer) => {
  let priceValue = '';

  if (offer.offer.price < 10000) {
    priceValue = 'low';
  }
  if ((offer.offer.price >= 10000) && (offer.offer.price <= 50000)) {
    priceValue = 'middle';
  }
  if (offer.offer.price > 50000) {
    priceValue = 'high';
  }

  if (((filterPrice.value == priceValue) || (filterPrice.value == 'any'))) {
    return true;
  } else {
    return false;
  }
}

// фильтрация объявлений по количеству комнат
const filterRoomsCheck = (offer) => {
  // console.log(offer);
  if (((offer.offer.rooms == filterRooms.value) || (filterRooms.value == 'any'))) {
    return true;
  } else {
    return false;
  }
}

// фильтрация объявлений по количеству гостей
const filterGuestsCheck = (offer) => {

  if (((offer.offer.guests == filterGuests.value) || (filterGuests.value == 'any'))) {
    return true;
  } else {
    return false;
  }
}

// фильтрация объявлений по удобствам
const filterFeaturesCheck = (offer) => {

  // проверка наличия фильтров. Если их нет, то ничего не проверяем
  let isSomeChecked = Array.from(filterFeaturesInputs).some((item) => {
    return item.checked == true;
  })

  if (!isSomeChecked) {
    return true
  }

  // если фильтры есть, то сверяем выбранные опции и опции предлагаемых объявлений
  if (offer.offer.features) {
    let featuresCheked = Array.from(filterFeaturesInputs)
      .filter((item) => item.checked)
      .map((item) => item.value)
      .filter((item) => !offer.offer.features.includes(item));

    if (featuresCheked.length == 0) {
      return true
    } else {
      return false
    }
  }

  // проверка через тысячаифье
  // let isOfferFits = false;
  // if (offer.offer.features) {
  //   if ((offer.offer.features.includes('wifi')) && (filterFeaturesInputs[0].checked == true) && ((offer.offer.features.includes('dishwasher')) && (filterFeaturesInputs[1].checked == true)) && ((offer.offer.features.includes('parking')) && (filterFeaturesInputs[2].checked == true)) && ((offer.offer.features.includes('washer')) && (filterFeaturesInputs[3].checked == true)) && ((offer.offer.features.includes('elevator')) && (filterFeaturesInputs[4].checked == true))  && ((offer.offer.features.includes('conditioner')) && (filterFeaturesInputs[5].checked == true)) ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}

// фильтрация объявлений по всем фильтрам
const allFiltersCheck = (offer) => {
  return (filterRoomsCheck(offer) && filterTypeCheck(offer) && filterPriceCheck(offer) && filterGuestsCheck(offer) && filterFeaturesCheck(offer));
}

// ПРОСЛУШКА ИЗМЕНЕНИЙ ПОЛЕЙ ФИЛЬТРА ДЛЯ РЕРЕНДЕРИНГА КАРТЫ
const filterTypeChange = (callback) => {
  filterType.addEventListener('change', () => {
    callback();
  })
}

const filterPriceChange = (callback) => {
  filterPrice.addEventListener('change', () => {
    callback();
  })
}

const filterRoomsChange = (callback) => {
  filterRooms.addEventListener('change', () => {
    callback();
  })
}

const filterGuestsChange = (callback) => {
  filterGuests.addEventListener('change', () => {
    callback();
  })
}

const filterFeaturesChange = (callback) => {

  for (let feature of filterFeaturesInputs) {
    feature.addEventListener('change', () => {
      callback();
    })
  }
}

const allFiltersChange = (callback) => {
  filterTypeChange(callback);
  filterPriceChange(callback);
  filterRoomsChange(callback);
  filterGuestsChange(callback);
  filterFeaturesChange(callback);
}

// ДЕЗАКТИВАЦИЯ ФОРМ
// дезактивация формы ввода информации
const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  const childrenForm = adForm.querySelectorAll('fieldset');
  childrenForm.forEach((elem) => {
    elem.disabled = true;
  })
}

// дезактивация формы фильтрации
const disableFormFilter = () => {
  filterForm.classList.add('ad-form--disabled');
  for (let elem of filterForm.children) {
    elem.disabled = true;
  }
}

// дезактивация всех форм
const disableForms = () => {
  disableForm();
  disableFormFilter();
  console.log('forms disabled');
}

// АКТИВАЦИЯ ФОРМ
// активация формы ввода информации
const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  const childrenForm = adForm.querySelectorAll('fieldset');
  childrenForm.forEach((elem) => {
    elem.disabled = false;
  })
}

// активация формы фильтрации
const enableFormFilter = () => {
  filterForm.classList.remove('ad-form--disabled');
  for (let elem of filterForm.children) {
    elem.disabled = false;
  }
}

// акривация всех форм
const enableForms = () => {
  enableForm();
  enableFormFilter();
  adFormAvatarChange();
  adFormPhotoChange();
  console.log('forms enabled');
}

// ОБНУЛЕНИЕ ФОРМ
const resetForm = () => {
  adForm.reset();
  filterForm.reset();
}

// ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ
// удаление отображения валидации в рамке
const deleteValidation = () => {
  adForm.classList.remove('validation')
}

// проверка заголовка
const onTitleInput = () => {
  const lengthValue = title.value.length;
  if (lengthValue < CUSTOMMINLENGTH) {
    title.setCustomValidity(`Минимум ${CUSTOMMINLENGTH} символов. Осталось ввести еще ${CUSTOMMINLENGTH - lengthValue} символов`);
    adForm.classList.remove('validation');
  } else if (lengthValue > CUSTOMMAXLENGTH) {
    title.setCustomValidity(`Максимум ${CUSTOMMAXLENGTH} символов. Лишних ${lengthValue - CUSTOMMAXLENGTH} символов`);
    adForm.classList.remove('validation');
  } else {
    title.setCustomValidity(''); // убираем customError: true у title.validity
    adForm.classList.add('validation');
  }
  title.reportValidity();
}

const onTitleCheck = () => {
  title.addEventListener('input', onTitleInput);
  title.addEventListener('blur', deleteValidation);
}

// проверка ввода цены
const onPriceInput = () => {
  if (price.value <= MinPrices[type.value]) {
    price.setCustomValidity(`цена не должна быть меньше ${MinPrices[type.value]} для типа жилья ${type.value}`);
    adForm.classList.remove('validation');
  } else if (price.value > MaxPrices[type.value]) {
    price.setCustomValidity(`цена не должна быть больше ${MaxPrices[type.value]} для типа жилья ${type.value}`);
    adForm.classList.remove('validation');
  } else {
    price.setCustomValidity('');
    adForm.classList.add('validation');
  }
  price.reportValidity();
}

const onPriceCheck = () => {
  price.addEventListener('input', onPriceInput);
  price.addEventListener('blur', deleteValidation);
}

// проверка типа жилья
const onTypeInput = () => {
  price.value = '';
  price.placeholder = MinPrices[type.value];
}

const onTypeInputCheck = () => {
  type.addEventListener('change', onTypeInput);
}

// синхронизация времени въезда и выезда
const onTimeInCheck = () => {
  timein.addEventListener('change', () => timeout.selectedIndex = timein.selectedIndex);
}

const onTimeOutCheck = () => {
  timeout.addEventListener('change', () => timein.selectedIndex = timeout.selectedIndex);
}

// проверка вместимости комнат
const onRoomNumberChange = () => {

  let arr = roomGuestsNumber[roomNumber.value];
  let length = roomNumber.length;
  for (let i = 0; i < length; i++) {
    if (!arr.includes(Number(capacity[i].value))) {
      capacity[i].disabled = true;
    } else {
      capacity[i].disabled = false;
      capacity.selectedIndex = i;
    }
  }
}

const onRoomNumberCheck = () => {
  roomNumber.addEventListener('change', onRoomNumberChange)
}

const setValidation = () => {
  onTitleCheck();
  onPriceCheck();
  onTypeInputCheck();
  onTimeInCheck();
  onTimeOutCheck();
  onRoomNumberCheck();
}

// действия при успешной валидации. Кнопка "опубликовать"

// удачная отправка формы
const success = () => {
  document.body.append(messageSuccess);
  messageSuccess.style.display = 'block';
  messageSuccess.addEventListener('click', () => {
    messageSuccess.style.display = 'none';
  })

  const pressKey = function () {
    if (event.keyCode === 27) {
      messageSuccess.style.display = 'none';
      window.removeEventListener('keydown', pressKey);
    }
  }

  window.addEventListener('keydown', pressKey);
}


// ОТПРАВКА ФОРМЫ
const sendForm = (callback) => {
  buttonSubmit.addEventListener('click', async (evt) => {
    evt.preventDefault();
    if (title.validity.valid && price.validity.valid) {
      success();
      resetForm();
      clearImages();
      callback();
      // await sendData(new FormData(evt.target));
      // await sendData(new FormData(adForm));
      // console.log('удачная валидация')
    } else {
      title.reportValidity();
      price.reportValidity();
    }
  })
}

// ОЧИСТКА ФОРМ
const clearForm = (callback) => {
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    clearImages();
    callback();
  })
}

//  отправка формы через саму форму
// adForm.addEventListener('submit', async (evt) => {
//   try {
//     evt.preventDefault();
//     // const data =  await new FormData(adForm);
//     // console.log(data);
//     // await sendData(data);
//     await sendData(new FormData(adForm));
//     success();
//   } catch (err) {
//     console.log('ошибка валидации');
//   }
// });

export {
  enableForms,
  disableForms,
  allFiltersCheck,
  allFiltersChange,
  setValidation,
  sendForm,
  clearForm
}
