import {checkMaxLength, isEscapeKey} from './util.js';

const MAX_LENGTH_DESCRIPTION = 140;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const REG = /^#[\dA-Za-zА-Яа-яЁё0-9]{1,}$/;

const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');
const uploadFileForm = uploadForm.querySelector('#upload-file');
const closePopupButton = uploadForm.querySelector('#upload-cancel');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__validate', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__validate', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div' // Тег, который будет обрамлять текст ошибки
});

const checkLengthDescription = (value) => checkMaxLength(value, MAX_LENGTH_DESCRIPTION);

pristine.addValidator(
  textDescription,
  checkLengthDescription,
  `Максимальная длина ${MAX_LENGTH_DESCRIPTION} символов`
);

const isValidForm = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
};

const formCloseHandler =  () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', buttonEscCloseHandler);
  uploadForm.removeEventListener('submit', isValidForm);

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
  uploadForm.addEventListener('submit', isValidForm);
};

uploadFileForm.addEventListener('change', formOpenHandler);
