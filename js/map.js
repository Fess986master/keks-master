import {
  createPopup
} from './popup.js';

import {
  enableForms,
  allFiltersCheck,
  allFiltersChange,
  sendForm,
  clearForm
} from './form.js';
import {
  getData
} from './api.js';

console.log('map download')

const mapCanvas = document.querySelector('#map-canvas');
const adress = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const buttonSubmit = adForm.querySelector('.ad-form__submit');
const map = L.map(mapCanvas);
const markerGroup = L.layerGroup().addTo(map);

const MapSettings = {
  NUMBER_OF_ADVERTISTMENTS: 10,
  MAIN_ADRESS_LAT: 35.65283,
  MAIN_ADRESS_LNG: 139.83947,
}
let advertistments = [];

// ИНИЦИАЛИЗАЦИЯ КАРТЫ
const initMap = () => {
  map
    .on('load', async () => {
      try { // инициализация при загрузке
        console.log('map is load');
        enableForms();
        advertistments = await getData();
        adress.value = `${MapSettings.MAIN_ADRESS_LAT}, ${MapSettings.MAIN_ADRESS_LNG}`;
        createOffers(advertistments);
      } catch (err) {
        alert(`ошибка загрузки данных: ${err}`);
      }
    })

    .setView({
      lat: MapSettings.MAIN_ADRESS_LAT,
      lng: MapSettings.MAIN_ADRESS_LNG,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAncor: [26, 52],
  })

  // создаем передвигаемую метку
  const mainMarker = L.marker({
    lat: 35.65283,
    lng: 139.83947,
  }, {
    draggable: true,
    icon: mainPinIcon,
  });
  mainMarker.addTo(map)
    .bindPopup('мое объявление');

  mainMarker.on('move', (evt) => {
    adress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

 // сброс метки на начальное состояние
  const clearMainMarker = () => {
    map.closePopup();
    mainMarker.setLatLng({
      lat: 35.65283,
      lng: 139.83947,
    });

    map.setView({
      lat: 35.65283,
      lng: 139.83947,
    }, 12);
    console.log('сбрасываем метку');
  }

  // отправка формы со сбросом карты
  sendForm(() => {
    rerenderMap();
    clearMainMarker();
  });

  // кнопка "очистить"
  clearForm(() => {
    rerenderMap();
    clearMainMarker();
  });

}
// initMap();



// создаем иконку метки
const offerPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAncor: [20, 40],
})

// создание одного маркера на карте
const createOffer = (offer) => {
  const offerMarker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng,
  }, {
    icon: offerPinIcon,
  });
  offerMarker.addTo(markerGroup)
    .bindPopup(createPopup(offer));
}

// создания меток на карте
const createOffers = (offers) => {
  let filteredOffers = offers.filter((offer) => allFiltersCheck(offer));
  filteredOffers
    .slice(0, MapSettings.NUMBER_OF_ADVERTISTMENTS)
    .forEach((offer) => createOffer(offer));
}

// очистка карты
const clearOffers = () => {
  markerGroup.clearLayers()
}



// ререндеринг карты, с дебаунсом от лодэша
const rerenderMap = _.debounce(
  () => {
    clearOffers();
    createOffers(advertistments);
  }, 1000
);

export { initMap, rerenderMap }
