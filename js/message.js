'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  var onErrorSend = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    errorElement.querySelector('.error__button').addEventListener('click', onErrorMessageClick);
    mainContainer.appendChild(errorElement);

    document.addEventListener('keydown', onEscKeydown);
    document.addEventListener('mousedown', onErrorMessageMouseDown);
  };

  var onEscKeydown = function (evt) {
    if (onSuccessSend && document.querySelector('.success')) {
      window.util.isEscEvent(evt, onSuccessMessageEscKeydown);
    } else if (onErrorSend && document.querySelector('.error')) {
      window.util.isEscEvent(evt, onErrorMessageEscKeydown);
    }
  };

  var errorMessageClose = function () {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('mousedown', onErrorMessageMouseDown);
  };

  var onErrorMessageClick = function () {
    errorMessageClose();
  };

  var onErrorMessageMouseDown = function () {
    errorMessageClose();
  };

  var onErrorMessageEscKeydown = function () {
    errorMessageClose();
  };

  var onSuccessSend = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainContainer.appendChild(successElement);

    document.addEventListener('keydown', onEscKeydown);
    document.addEventListener('mousedown', onSuccessMessageMouseDown);
  };

  var successMessageClose = function () {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('mousedown', onSuccessMessageMouseDown);
  };

  var onSuccessMessageMouseDown = function () {
    successMessageClose();
  };

  var onSuccessMessageEscKeydown = function () {
    successMessageClose();
  };

  window.message = {
    onErrorSend: onErrorSend,
    onSuccessSend: onSuccessSend
  };
})();
