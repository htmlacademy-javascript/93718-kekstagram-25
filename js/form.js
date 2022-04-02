import {isEscapeKey, resetValue} from './util.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const uploadFileForm = form.querySelector('#upload-file');
const closePopupButton = form.querySelector('#upload-cancel');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');

const formCloseHandler =  () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', buttonEscCloseHandler);

  resetValue(uploadFileForm);
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

  closePopupButton.addEventListener('click', formCloseHandler);
  document.addEventListener('keydown', buttonEscCloseHandler);
};

uploadFileForm.addEventListener('change', formOpenHandler);
