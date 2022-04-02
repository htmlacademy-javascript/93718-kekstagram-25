import {isEscapeKey, resetValue} from './util.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');

const formCloseHandler =  () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', buttonEscCloseHandler);

  resetValue(imgUploadInput);
  resetValue(textHashtags);
  resetValue(textDescription);
  document.querySelector('#effect-none').checked = true;
};

function buttonEscCloseHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    formCloseHandler();
  }
}

const formOpenHandler = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  imgUploadCancel.addEventListener('click', formCloseHandler);
  document.addEventListener('keydown', buttonEscCloseHandler);
};

imgUploadInput.addEventListener('change', formOpenHandler);
