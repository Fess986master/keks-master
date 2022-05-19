// console.log(advertistments);

const templateCard = document.querySelector('#card').content;
const popup = templateCard.querySelector('.popup');
// console.log(canvas);
const typeTranslation = {
  'flat': 'Квартира',
  'bangalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
}

// создание попапа для объявлений по близости
function createPopup(offer) {
  const popupSimilsr = popup.cloneNode(true); // клонируем оригинал
  // добавляем аватар
  popupSimilsr.querySelector('.popup__avatar').src = offer.author.avatar;
  // добавляем заголовок
  popupSimilsr.querySelector('.popup__title').innerHTML = offer.offer.title;
  // добавляем адрес
  popupSimilsr.querySelector('.popup__text--address').innerHTML = offer.offer.adress;
  // добавляем цену
  popupSimilsr.querySelector('.popup__text--price').innerHTML = offer.offer.price + 'Р/ночь';
  // добавляем тип
  popupSimilsr.querySelector('.popup__type').innerHTML = typeTranslation[offer.offer.type];
  // добавляем вместимость
  popupSimilsr.querySelector('.popup__text--capacity').innerHTML = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  // добавляем график
  popupSimilsr.querySelector('.popup__text--time').innerHTML = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout} `;
  // добавляем удобства
  if (offer.offer.features) {
    if (!offer.offer.features.includes('wifi')) {
      popupSimilsr.querySelector('.popup__feature--wifi').remove();
    }
    if (!offer.offer.features.includes('elevator')) {
      popupSimilsr.querySelector('.popup__feature--elevator').remove();
    }
    if (!offer.offer.features.includes('parking')) {
      popupSimilsr.querySelector('.popup__feature--parking').remove();
    }
    if (!offer.offer.features.includes('dishwasher')) {
      popupSimilsr.querySelector('.popup__feature--dishwasher').remove();
    }
    if (!offer.offer.features.includes('washer')) {
      popupSimilsr.querySelector('.popup__feature--washer').remove();
    }
    if (!offer.offer.features.includes('conditioner')) {
      popupSimilsr.querySelector('.popup__feature--conditioner').remove();
    }
  } else {
    popupSimilsr.querySelector('.popup__feature--wifi').remove();
    popupSimilsr.querySelector('.popup__feature--elevator').remove();
    popupSimilsr.querySelector('.popup__feature--parking').remove();
    popupSimilsr.querySelector('.popup__feature--dishwasher').remove();
    popupSimilsr.querySelector('.popup__feature--washer').remove();
    popupSimilsr.querySelector('.popup__feature--conditioner').remove();
  }
  // добавляем описание
  popupSimilsr.querySelector('.popup__description').innerHTML = offer.offer.description;

  return popupSimilsr;
}

export {
  createPopup
};

// console.log(nearestAdvertisements);
