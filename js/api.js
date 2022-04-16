import {showAlert} from './util.js';

const URL_GET = 'https://25.javascript.pages.academy/kekstagram/data';
const URL_POST = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(URL_GET)
    .then((response) =>
      response.json())
    .then((data) =>
      onSuccess(data))
    .catch(() =>
      showAlert('Не удалось загрузить изображения с сервера', 'red', '16px'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_POST,
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

export {getData, sendData};
