'use strict';

(function () {
  var URL_LOAD = window.constants.URL.LOAD;
  var OK_STATUS = window.constants.statusCode.OK;
  var TIMEOUT = window.constants.TIMEOUT_IN_MS;

  var onError = function (message) {
    console.error(message);
  };

  // var onSuccess = function (getData) {
  //   getData.forEach(function (data) {
  //     window.data.adverts.push(data);
  //   });
  // };

  var onSuccess = function (getData) {
    for (var i = 0; i < getData.length; i++) {
      window.data.adverts.push(getData[i]);
    }

    // window.data.adverts.slice(0, 5);
  };

  var load = function (url, onsuccess, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onsuccess = onSuccess(xhr.response); //???
      } else {
        onerror = onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText); //???
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
