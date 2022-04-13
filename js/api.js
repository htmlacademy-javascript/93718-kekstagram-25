import {showAlert} from './util.js';

let arrayPhotosData = [];

const getPhotosData = (data) => {
  arrayPhotosData = data;
};

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) =>
      response.json())
    .then((data) => {
      onSuccess(data);
      getPhotosData(data);
    })
    .catch(() => {
      showAlert('Не удалось загрузить изображения с сервера', 'red', '16px');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData, arrayPhotosData};
