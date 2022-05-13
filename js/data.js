// блок генерации случайных объявлений. В проекте не используем, так как данные получаем по сети

import {
  random,
  randomFloating
} from './util.js';



//блок массивов - констант
const FEATURES_LIST = ['wifi', 'dishwasher', 'ranking', 'washer', 'elevator', 'conditioner'];
const TYPE_LIST = ['palace', 'flat', 'house', 'bangalow'];
const CHECK_LIST = ['12:00', '13:00', '14:00'];
const PHOTOS_LIST = ['hotel1.jpg', 'hotel2.jpg', 'hotel3.jpg'];

//блок объявления нулевых свойств и заготовок
let avatar = 'img/avatars/user0';
const title = 'заголовок(да, у меня очень хорошая фантазия!)';
let adress, price, type, rooms, guests, checkout, checkin;
const description = 'другое офиненно продуманное в мелочах описание';
let photos = new Array();
let features = new Array();

//функции - генераторы
const createAvatar = function () {
  return avatar + random(1, 8) + '.png'
}

const createAdress = function () {
  return adress = 'location1 x = ' + randomFloating(1, 100, 5) + ' location1 y = ' + randomFloating(1, 100, 5);
}

const createPrice = () => random(1, 1000);

const createType = () => TYPE_LIST[random(0, 3)];

const createRooms = () => random(10, 50);

const createGuests = () => random(100, 500);

const createCheckin = () => CHECK_LIST[random(0, 2)];

const createCheckout = () => CHECK_LIST[random(0, 2)];

const createPhotos = () => PHOTOS_LIST[random(0, 2)]; //надо пушить

const createX = () => randomFloating(35.65, 35.7, 5);

const createY = () => randomFloating(139.7, 139.8, 5);


const createFeatures = function () {
  let patternArray = new Array(6).fill(0).map(function (name, index) {
    return index + 1;
  });
  features.slice(0, 6);
  let add = new Array(0);
  let patternArrayCopy = patternArray.slice();
  let z = 6;
  let featuresLength = random(1, 6);
  for (let i = 0; i < featuresLength; i++) {
    let xdel = patternArrayCopy.splice(random(0, z - 1), 1);
    z--;
    add.push(FEATURES_LIST[xdel[0] - 1]);
  }
  return add;
}

// функции создания объектов

const createAuthor = () => {
  return {
    avatar: createAvatar()
  }
}

const createOffer = () => {
  return {
    title: title,
    adress: createAdress(),
    price: createPrice(),
    type: createType(),
    rooms: createRooms(),
    guests: createGuests(),
    checkin: createCheckin(),
    checkout: createCheckout(),
    features: createFeatures(),
    description: description,
    photos: createPhotos()
  }
}

const createLocation = () => {
  return {
    "x": createX(),
    "y": createY()
  }
}

const createAdvertisement = () => {
  return {
    author: createAuthor(),
    offer: createOffer(),
    loc: createLocation(),
  }
}

const nearestAdvertisements = new Array(10).fill(0).map(() => createAdvertisement());

export {
  nearestAdvertisements
};
