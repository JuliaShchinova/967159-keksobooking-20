'use strict';

(function () {
  var map = window.map.element;
  var isEscEvent = window.util.isEscEvent;
  var types = window.constants.types;

  var mapFilters = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var onEscKeyDown = function (evt) {
    var popup = map.querySelector('.popup');

    isEscEvent(evt, function () {
      if (popup !== null) {
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
        removeActivePin();
      }
    });
  };

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');

    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardFeaturesItem = cardFeatures.querySelectorAll('.popup__feature');
    for (var i = 0; i < cardFeaturesItem.length; i++) {
      if (card.offer.features.indexOf(cardFeaturesItem[i].classList[1].replace('popup__feature--', '')) < 0) {
        cardFeaturesItem[i].remove();
      }
    }

    var cardDescription = cardElement.querySelector('.popup__description');

    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardPhotosImage = cardPhotos.querySelector('img');

    if (card.offer.photos.length > 0) {
      cardPhotosImage.src = card.offer.photos[0];
      for (var j = 1; j < card.offer.photos.length; j++) {
        var cardPhoto = cardPhotosImage.cloneNode(true);
        cardPhotosImage.src = card.offer.photos[j];
        cardPhotos.appendChild(cardPhoto);
      }
    } else {
      cardPhotos.remove();
    }

    var cardAvatar = cardElement.querySelector('.popup__avatar');

    cardTitle.textContent = card.offer.title;
    cardAddress.textContent = card.offer.address;
    cardPrice.textContent = card.offer.price + ' ₽/ночь';
    cardType.textContent = types[card.offer.type].ru;
    cardCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardDescription.textContent = card.offer.description;
    cardAvatar.src = card.author.avatar;

    var popupClose = cardElement.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      removePopup();
    });

    document.addEventListener('keydown', onEscKeyDown);

    return cardElement;
  };

  var removePopup = function () {
    var popup = map.querySelector('.popup');

    if (popup !== null) {
      popup.remove();
    }
  };

  var removeActivePin = function () {
    var activePin = map.querySelector('.map__pin--active');

    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.card = {
    mapFilters: mapFilters,
    create: createCard,
    removePopup: removePopup,
    removeActivePin: removeActivePin
  };
})();
