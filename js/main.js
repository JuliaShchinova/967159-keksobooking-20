'use strict';

(function () {
  var BUTTON_EVT = window.constants.BUTTON_EVT;
  var MAX_COUNT = window.constants.MAX_COUNT;
  var map = window.map.element;
  var mainPin = window.pin.mainElement;
  var changeAddress = window.form.changeAddress;
  var onRoomSelectChange = window.form.onRoomSelectChange;
  var onTypeSelectChange = window.form.onTypeSelectChange;
  var onTimeInSelectChange = window.form.onTimeInSelectChange;
  var onTimeOutSelectChange = window.form.onTimeOutSelectChange;
  var setFieldsetState = window.form.setFieldsetState;
  var addForm = window.form.ad;
  var isEnterEvent = window.util.isEnterEvent;

  var offers = [];

  var setFormPreferences = function () {
    changeAddress();
    onRoomSelectChange();
    onTypeSelectChange();
    onTimeInSelectChange();
    onTimeOutSelectChange();
    setFieldsetState();
  };

  setFormPreferences();

  var onSuccess = function (data) {
    offers = data.map(function (item) {
      if (item.offer) {
        return item;
      }
    });

    window.pin.renderAdverts(offers.slice(0, MAX_COUNT));

    map.classList.remove('map--faded');

    setFieldsetState();

    addForm.classList.remove('ad-form--disabled');

    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onEnterKeydown);
  };

  var onError = function (message) {
    window.message.onErrorSend(message);
  };

  var activatePage = function () {
    window.backend.load(onSuccess, onError);
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.button === BUTTON_EVT) {
      activatePage();
      changeAddress();
    }
  };

  var onEnterKeydown = function (evt) {
    isEnterEvent(evt, function () {
      activatePage();
      changeAddress();
    });
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onEnterKeydown);
})();
