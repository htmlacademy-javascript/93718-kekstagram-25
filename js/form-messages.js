import {body} from './form.js';
import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();


const showMessageSuccess = () => {
  const messageSuccess = successTemplate.cloneNode(true);
  successFragment.appendChild(messageSuccess);
  body.appendChild(successFragment);

  const successButton = document.querySelector('.success__button');
  const successElement = document.querySelector('.success');
  const successInner = document.querySelector('.success__inner');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successElement.remove();
    }
  });

  successElement.addEventListener(('click'), (evt) => {
    if (evt.target === successButton) {
      successElement.remove();
    }
  });

  successElement.addEventListener(('click'), (evt) => {
    if (evt.target === successInner) {
      successElement.remove();
    }
  });
};

const showMessageError = () => {
  const messageError = errorTemplate.cloneNode(true);
  errorFragment.appendChild(messageError);
  body.appendChild(errorFragment);

  const errorButton = document.querySelector('.error__button');
  const errorElement = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorElement.remove();
    }
  });

  errorElement.addEventListener(('click'), (evt) => {
    if (evt.target === errorButton) {
      errorElement.remove();
    }
  });

  errorElement.addEventListener(('click'), (evt) => {
    if (evt.target === errorInner) {
      errorElement.remove();
    }
  });
};

export {showMessageSuccess, showMessageError};
