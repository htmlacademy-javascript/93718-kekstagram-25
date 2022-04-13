import {bigPictureShow} from './popup.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPhotoMiniatures = (miniaturesData) => {
  miniaturesData.forEach(({url, likes, comments, description}) => {
    const elementPicture = picturesTemplate.cloneNode(true);

    elementPicture.querySelector('.picture__img').src = url;
    elementPicture.querySelector('.picture__likes').textContent = likes;
    elementPicture.querySelector('.picture__comments').textContent = comments.length;

    elementPicture.addEventListener('click', (evt) => {
      evt.preventDefault();

      bigPictureShow({url, likes, comments, description});
    });

    fragment.appendChild(elementPicture);
  });

  picturesContainer.appendChild(fragment);
};

export {
  renderPhotoMiniatures,
  picturesContainer,
  picturesTemplate,
  fragment
};
