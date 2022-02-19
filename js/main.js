// Функция для получения случайного положительного целого числа из диапозона
function getRandomNumber(min, max) {
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
