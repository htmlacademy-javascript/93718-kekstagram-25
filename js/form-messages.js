import {body} from './form.js';
import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

const showMessageEvent = (element, elementButton, elementInner) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
    }
  });

  element.addEventListener(('click'), (evt) => {
    if (evt.target === elementButton) {
      element.remove();
    }
  });

  element.addEventListener(('click'), (evt) => {
    if (evt.target === elementInner) {
      element.remove();
    }
  });
};

const showMessageSuccess = () => {
  const messageSuccess = successTemplate.cloneNode(true);
  successFragment.appendChild(messageSuccess);
  body.appendChild(successFragment);

  const successElement = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  const successInner = document.querySelector('.success__inner');

  showMessageEvent(successElement, successButton, successInner);
};

const showMessageError = () => {
  const messageError = errorTemplate.cloneNode(true);
  errorFragment.appendChild(messageError);
  body.appendChild(errorFragment);

  const errorElement = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  const errorInner = document.querySelector('.error__inner');

  showMessageEvent(errorElement, errorButton, errorInner);
};

export {showMessageSuccess, showMessageError};
