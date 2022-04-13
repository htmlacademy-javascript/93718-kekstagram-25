import {arrayPhotosData} from './api.js';
import {createRandomId} from './util.js';

import {
  renderPhotoMiniatures,
  picturesContainer,
  picturesTemplate,
  fragment
} from './photo-miniatures.js';

import {bigPictureShow} from './popup.js';

const RANDOM_PHOTOS_COUNT = 10;
const MIN_ID_COUNT = 0;
const MAX_ID_COUNT = 24;

const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

const filterDefault = () => {
  clearPictures();
  renderPhotoMiniatures(arrayPhotosData);
};

const filterRandom = (photosData) => {
  clearPictures();

  const getRandomId = createRandomId(MIN_ID_COUNT, MAX_ID_COUNT);
  const idArray = [];

  for (let i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
    idArray[i] = getRandomId();
  }

  idArray.forEach((id) => {
    photosData.forEach((photo) => {
      if (id === photo.id) {
        const elementPicture = picturesTemplate.cloneNode(true);

        elementPicture.querySelector('.picture__img').src = photo.url;
        elementPicture.querySelector('.picture__likes').textContent = photo.likes;
        elementPicture.querySelector('.picture__comments').textContent = photo.comments.length;

        elementPicture.addEventListener('click', (evt) => {
          evt.preventDefault();

          bigPictureShow(photo);
        });

        fragment.appendChild(elementPicture);
      }
    });
  });

  picturesContainer.appendChild(fragment);
};

const filtersButtonShowHandler = (evt) => {
  evt.preventDefault();

  if (!evt.target.className.match('img-filters__button--active') && evt.target.className.match('img-filters__button')) {
    const arrayButtons = Array.from(filtersButton);

    arrayButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    evt.target.classList.add('img-filters__button--active');
  }
};

const showFiltersForm = () => {
  filter.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', filtersButtonShowHandler);
};

export {showFiltersForm};
