import {uploadPreview} from './effects.js';

const TYPES_OF_IMAGES = ['gif', 'jpg', 'jpeg', 'png'];

const selectPhoto = document.querySelector('.img-upload__start input[type=file]');
const imgPreview = uploadPreview.querySelector('img');

selectPhoto.addEventListener('change', () => {
  const file = selectPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_OF_IMAGES.some((elem) => fileName.endsWith(elem));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
});

