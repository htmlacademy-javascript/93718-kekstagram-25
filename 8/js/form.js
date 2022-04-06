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

const getArrayHashtags = (string) => {
  string = string.toLowerCase().trim();
  const arrHashtags = string.split(' ');
  return arrHashtags.filter((hashtag) => (hashtag !== ''));
};

const checkHashtagSymbol = (value) => getArrayHashtags(value)
  .every((hashtag) => (hashtag.startsWith('#')));

pristine.addValidator(
  textHashtags,
  checkHashtagSymbol,
  'Хэштег должен начинаться со знака "#"'
);

const isOnlyHashtag = (value) => !(getArrayHashtags(value)
  .some((hashtag) => (hashtag.startsWith('#') && hashtag.length === 1)));

pristine.addValidator(
  textHashtags,
  isOnlyHashtag,
  'Хэштег не может содержать только "#"'
);

const checkHashtagsRepeat = (value) => {
  const hashtag = getArrayHashtags(value);
  return !(hashtag.some((tag, index) => hashtag.indexOf(tag) !== index));
};

pristine.addValidator(
  textHashtags,
  checkHashtagsRepeat,
  'Хэштеги не должны повторяться'
);

const checkHashtagsLength = (value) => getArrayHashtags(value)
  .every((hashtag) => (checkMaxLength(hashtag, MAX_LENGTH_HASHTAG)));

pristine.addValidator(
  textHashtags,
  checkHashtagsLength,
  `Хэштег не должен быть больше ${MAX_LENGTH_HASHTAG} символов, включая "#"`
);

const checkHashtagsCount = (value) => checkMaxLength(getArrayHashtags(value), MAX_HASHTAGS);

pristine.addValidator(
  textHashtags,
  checkHashtagsCount,
  `Хэштегов не должно быть больше ${MAX_HASHTAGS}`
);

const checkHashtagReg = (value) => getArrayHashtags(value)
  .every((hashtag) => (hashtag.match(REG)));

pristine.addValidator(
  textHashtags,
  checkHashtagReg,
  'Невалидный хэштег'
);

const isValidForm = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
};

const buttonEscCancelHandler = () => document.removeEventListener('keydown', buttonEscCloseHandler);

const buttonEscRestoreHandler = () => document.addEventListener('keydown', buttonEscCloseHandler);

const formCloseHandler =  () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', buttonEscCloseHandler);
  uploadForm.removeEventListener('submit', isValidForm);
  textDescription.removeEventListener('focusin', buttonEscCancelHandler);
  textDescription.removeEventListener('focusout', buttonEscRestoreHandler);
  textHashtags.removeEventListener('focusin', buttonEscCancelHandler);
  textHashtags.removeEventListener('focusout', buttonEscRestoreHandler);

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
  textDescription.addEventListener('focusin', buttonEscCancelHandler);
  textDescription.addEventListener('focusout', buttonEscRestoreHandler);
  textHashtags.addEventListener('focusin', buttonEscCancelHandler);
  textHashtags.addEventListener('focusout', buttonEscRestoreHandler);
};

uploadFileForm.addEventListener('change', formOpenHandler);
