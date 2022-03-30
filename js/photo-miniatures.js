import {generateData} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const fragment = document.createDocumentFragment();

const miniaturesData = generateData();

miniaturesData.forEach(({url, likes, comments}) => {
  const elementPicture = picturesTemplate.cloneNode(true);

  elementPicture.querySelector('.picture__img').src = url;
  elementPicture.querySelector('.picture__likes').textContent = likes;
  elementPicture.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(elementPicture);
});

picturesContainer.appendChild(fragment);
