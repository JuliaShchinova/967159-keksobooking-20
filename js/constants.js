'use strict';

(function () {
  var map = window.map.element;

  var constants = {
    COUNT: 8,

    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,

    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 65,
    MAIN_PIN_HEIGHT_ACTIVE: 83,

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    BUTTON_EVT: 0,

    types: {
      palace: {
        ru: 'Дворец',
        min: '10000'
      },
      flat: {
        ru: 'Квартира',
        min: '1000'
      },
      house: {
        ru: 'Дом',
        min: '5000'
      },
      bungalo: {
        ru: 'Бунгало ',
        min: '0'
      }
    },

    workArea: {
      COORD_X: {
        min: 0,
        max: map.offsetWidth
      },
      COORD_Y: {
        min: 130,
        max: 630
      }
    },

    URL: {
      LOAD: 'https://javascript.pages.academy/keksobooking/data',
      UP_LOAD: 'https://javascript.pages.academy/keksobooking/'
    },

    statusCode: {
      OK: 200
    },

    TIMEOUT_IN_MS: 10000
  };

  window.constants = constants;
})();
