const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
// const imgUploadCancel = form.querySelector('.img-upload__cancel');

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

imgUploadInput.addEventListener('change', openForm);

