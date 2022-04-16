import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

const messageSuccess = successTemplate.cloneNode(true);
successFragment.appendChild(messageSuccess);
body.appendChild(successFragment);
const messageError = errorTemplate.cloneNode(true);
errorFragment.appendChild(messageError);
body.appendChild(errorFragment);

const successElement = document.querySelector('.success');
const successButton = document.querySelector('.success__button');
const successInner = document.querySelector('.success__inner');
const errorElement = document.querySelector('.error');
const errorButton = document.querySelector('.error__button');
const errorInner = document.querySelector('.error__inner');

successElement.classList.add('hidden');
errorElement.classList.add('hidden');

const successEscCloseHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    hideElement(successElement);
  }
};

const errorEscCloseHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    hideElement(errorElement);
  }
};

const successButtonHandler = (evt) => {
  if (evt.target === successButton) {
    hideElement(successElement);
  }
};

const errorButtonHandler = (evt) => {
  if (evt.target === errorButton) {
    hideElement(errorElement);
  }
};

const successInnerClickHandler = (evt) => {
  if (evt.target !== successInner && evt.target !== successInner.querySelector('h2')) {
    hideElement(successElement);
  }
};

const errorInnerClickHandler = (evt) => {
  if (evt.target !== errorInner && evt.target !== errorInner.querySelector('h2')) {
    hideElement(errorElement);
  }
};

function hideElement (element) {
  element.classList.add('hidden');

  document.removeEventListener('keydown', successEscCloseHandler);
  successButton.removeEventListener('click', successButtonHandler);
  successElement.removeEventListener('click', successInnerClickHandler);
  document.removeEventListener('keydown', errorEscCloseHandler);
  errorButton.removeEventListener('click', errorButtonHandler);
  errorElement.removeEventListener('click', errorInnerClickHandler);
}

const showMessageSuccess = () => {
  successElement.classList.remove('hidden');

  successButton.addEventListener('click', successButtonHandler);
  successElement.addEventListener('click', successInnerClickHandler);
  document.addEventListener('keydown', successEscCloseHandler);
};

const showMessageError = () => {
  errorElement.classList.remove('hidden');

  errorButton.addEventListener('click', errorButtonHandler);
  errorElement.addEventListener('click', errorInnerClickHandler);
  document.addEventListener('keydown', errorEscCloseHandler);
};

export {body, showMessageSuccess, showMessageError};
