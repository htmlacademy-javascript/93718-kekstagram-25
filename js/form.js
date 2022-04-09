import {checkMaxLength, isEscapeKey} from './util.js';

const MAX_LENGTH_DESCRIPTION = 140;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const REG = /^#[\dA-Za-zА-Яа-яЁё0-9]{1,}$/;
const SCALE_CONTROL_STEP = 25;
const MIN_SCALE_CONTROL = 25;
const MAX_SCALE_CONTROL = 100;

const FILTERS = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');
const uploadFileForm = uploadForm.querySelector('#upload-file');
const closePopupButton = uploadForm.querySelector('#upload-cancel');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectValue = uploadForm.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1
});

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  const filterName = imgUploadPreview.dataset.filterName;

  if (filterName) {
    const effect = FILTERS[filterName].effect;
    const unit = FILTERS[filterName].unit;
    imgUploadPreview.style.filter = `${effect}(${effectValue.value}${unit})`;
  }
});

const changeImagePreview = (scale) => {
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
};

const decreaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);

  if (scale > MIN_SCALE_CONTROL) {
    scale -= SCALE_CONTROL_STEP;
    scaleControlValue.value = `${scale}%`;
    changeImagePreview (scale);
  }
};

const increaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);

  if (scale < MAX_SCALE_CONTROL) {
    scale += SCALE_CONTROL_STEP;
    scaleControlValue.value = `${scale}%`;
    changeImagePreview (scale);
  }
};

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
  scaleControlSmaller.removeEventListener('click', decreaseScale);
  scaleControlBigger.removeEventListener('click', increaseScale);

  changeImagePreview(100);
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
  scaleControlSmaller.addEventListener('click', decreaseScale);
  scaleControlBigger.addEventListener('click', increaseScale);
};

uploadFileForm.addEventListener('change', formOpenHandler);
