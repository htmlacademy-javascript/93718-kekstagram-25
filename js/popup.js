import {isEscapeKey} from './util.js';

const COMMENTS_PER_STEP = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountElement = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const currentComments = document.querySelector('.current-comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const showComments = (element) => {
  commentsList.innerHTML = '';

  element.forEach((comment) => {
    const commentElement = commentItem.cloneNode(true);

    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentElement.querySelector('.social__picture').src = comment.avatar;

    commentsList.appendChild(commentElement);
  });
};

const bigPictureCloseHandler = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', buttonEscCloseHandler);
};

function buttonEscCloseHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    bigPictureCloseHandler();
  }
}

const bigPictureShow = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCountElement.textContent = comments.length;
  pictureDescription.textContent = description;
  showComments(comments);

  document.addEventListener('keydown', buttonEscCloseHandler);
  closeButton.addEventListener('click', bigPictureCloseHandler);
};

export {bigPictureShow};
