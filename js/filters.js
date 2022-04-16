import {getData} from './api.js';
import {createRandomId} from './util.js';

import {
  renderPhotoMiniatures,
  picturesContainer,
  picturesTemplate,
  fragment
} from './photo-miniatures.js';

import {showBigPicture} from './popup.js';
import {debounce} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const MIN_ID_COUNT = 0;
const MAX_ID_COUNT = 24;

const RERENDER_DELAY = 500;

const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

let arrayPhotosData = [];

getData((data) => {
  arrayPhotosData = data;
});

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
  const identifiers = [];

  for (let i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
    identifiers[i] = getRandomId();
  }

  identifiers.forEach((id) => {
    photosData.forEach((photo) => {
      if (id === photo.id) {
        const elementPicture = picturesTemplate.cloneNode(true);

        elementPicture.querySelector('.picture__img').src = photo.url;
        elementPicture.querySelector('.picture__likes').textContent = photo.likes;
        elementPicture.querySelector('.picture__comments').textContent = photo.comments.length;

        elementPicture.addEventListener('click', (evt) => {
          evt.preventDefault();

          showBigPicture(photo);
        });

        fragment.appendChild(elementPicture);
      }
    });
  });

  picturesContainer.appendChild(fragment);
};

const getCommentLength = (photo) => {
  const commentLength = photo.comments.length;

  return commentLength;
};

const compareNumbers = (commentA, commentB) => {
  const numA = getCommentLength(commentA);
  const numB = getCommentLength(commentB);

  return numB - numA;
};

const filterDiscussed = (photosData) => {
  clearPictures();

  photosData
    .slice()
    .sort(compareNumbers)
    .forEach((photo) => {
      const elementPicture = picturesTemplate.cloneNode(true);

      elementPicture.querySelector('.picture__img').src = photo.url;
      elementPicture.querySelector('.picture__likes').textContent = photo.likes;
      elementPicture.querySelector('.picture__comments').textContent = photo.comments.length;

      elementPicture.addEventListener('click', (evt) => {
        evt.preventDefault();

        showBigPicture(photo);
      });

      fragment.appendChild(elementPicture);
    });

  picturesContainer.appendChild(fragment);
};

const filtersButtonClickHandler = (evt) => {
  evt.preventDefault();

  if (!evt.target.className.match('img-filters__button--active') && evt.target.className.match('img-filters__button')) {
    const arrayButtons = Array.from(filtersButton);

    arrayButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    evt.target.classList.add('img-filters__button--active');

    switch (evt.target.id) {
      case 'filter-random': {
        filterRandom(arrayPhotosData);
        break;
      }
      case 'filter-discussed': {
        filterDiscussed(arrayPhotosData);
        break;
      }
      case 'filter-default': {
        filterDefault();
        break;
      }
      default: {
        clearPictures();
      }
    }
  }
};

const showFiltersForm = () => {
  filter.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce(filtersButtonClickHandler, RERENDER_DELAY));
};

export {showFiltersForm};
