import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');
const uploadFileForm = uploadForm.querySelector('#upload-file');
const closePopupButton = uploadForm.querySelector('#upload-cancel');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const formCloseHandler =  () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', buttonEscCloseHandler);

  uploadForm.reset();
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
