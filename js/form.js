import {isEscapeKey, resetValue} from './util.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');

const closeForm =  () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', closeEscapeButton);
};

function closeEscapeButton (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeForm();

    resetValue(imgUploadInput);
    resetValue(textHashtags);
    resetValue(textDescription);
  }
}

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  imgUploadCancel.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeEscapeButton);
};

imgUploadInput.addEventListener('change', openForm);
