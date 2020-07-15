'use strict';

(function () {

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
