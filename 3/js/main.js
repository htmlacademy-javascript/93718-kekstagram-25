// Функция для получения случайного положительного целого числа из диапозона
function getRandomNumber (min, max) {
  if (min < 0) {
    return 'Минимальное число меньше нуля!';
  }

  if (min > max || min === max) {
    return 'Минимальное число больше или равно максимальному!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(0, 2);
getRandomNumber(-2, 2);
getRandomNumber(2, 2);
getRandomNumber(3, 2);

const commentText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
const maxCommentLength = getRandomNumber(1, 140);

// Функция для проверки максимальной длины строки
function checkMaxLength (str, maxLength) {
  return str.length <= maxLength;
}

checkMaxLength (commentText, maxCommentLength);


// Генерируем случайные данные фотографий и комментариев к ним
const CARDS_COUNT = 25;

const NAME = [
  'Василиса',
  'Гаврила',
  'Богдан',
  'Майя',
  'Сергей',
  'Клара',
  'Надежда',
  'Алиса',
  'Светлана',
  'Тимофей'
];

const DESCRIPTION = [
  'Старайтесь фотографировать при хорошем освещении, в идеале оно должно быть естественным.',
  'Если вы не знаете, как использовать вспышку должным образом, то вообще ее не включайте.',
  'Очень обидно, когда вы не нравитесь себе ни на одной фотографии.',
  'В наше время практически каждый человек периодически делает фотоснимки – неважно, камерой старенького телефона или профессиональной зеркальной камерой.',
  'Начинающие фотографы наверняка видели захватывающие кадры с движущимися объектами и хотели их повторить.',
  'Длиннофокусные объективы выполняют съемку с более узким углом обзора, чем угол зрения человеческого глаза.',
  'Фокусное расстояние объектива измеряется в миллиметрах и представляет собой расстояние от объектива до матрицы видеокамеры, на которую и фокусируется изображение.',
  'Размещая фото в интернете, вы вряд ли мечтаете о славе человека, который запечатлел себя на нелепом или неприличном фоне.',
  'Старайтесь наполнять снимки художественной ценностью, креативностью, юмором, в конце концов.',
  'Для создания качественных ночных кадров лучше снимать в RAW-формате.'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createRandomElement = (element) => element[getRandomNumber(0, element.length - 1)];

let photoId = 1;
let commentId = 1;

function createComment () {
  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createRandomElement(MESSAGE),
    name: createRandomElement(NAME)
  };
}

function createPhotoDescription () {
  return {
    url: `photos/${photoId++}.jpg`,
    description: createRandomElement(DESCRIPTION),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1, 10)}, createComment)
  };
}

const generateData = Array.from({length: CARDS_COUNT}, createPhotoDescription);

export {generateData};