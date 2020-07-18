'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  var onErrorSend = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    errorElement.querySelector('.error__button').addEventListener('click', errorMessageClose);
    mainContainer.appendChild(errorElement);

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', errorMessageClose);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, errorMessageClose);
  };

  var errorMessageClose = function () {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('mousedown', errorMessageClose);
  };

  window.message = {
    onErrorSend: onErrorSend
  };
})();
