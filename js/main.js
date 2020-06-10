'use strict';

var COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var adverts = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var times = ['12.00', '13.00', '14.00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var shaffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
};

var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');

var addAdverts = function () {
  for (var i = 0; i < COUNT; i++) {
    adverts.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Уютное жилье',
            'address': getRandomInt(1, 600) + ',' + getRandomInt(130, 630),
            'price': getRandomInt(0, 1000000),
            'type': type[getRandomInt(0, type.length - 1)],
            'rooms': getRandomInt(0, 100),
            'guests': getRandomInt(0, 3),
            'checkin': times[getRandomInt(0, times.length - 1)],
            'checkout': times[getRandomInt(0, times.length - 1)],
            'features': shaffleArray(features).slice(0, getRandomInt(0, features.length)),
            'description': 'Описание жилья',
            'photos': shaffleArray(photos).slice(0, getRandomInt(0, photos.length))
          },
          'location': {
            'x': getRandomInt(1, mapActive.offsetWidth),
            'y': getRandomInt(130, 630)
          }
        }
    );
  }
};

addAdverts();

var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createAdvert = function (pin) {
  var pinElement = pinsTemplate.cloneNode(true);

  var pinImage = pinElement.querySelector('img');
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;

  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

  return pinElement;
};

var renderAdverts = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createAdvert(adverts[i]));
  }

  pins.appendChild(fragment);
};

renderAdverts();
