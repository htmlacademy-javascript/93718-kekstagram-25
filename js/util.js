const ALERT_SHOW_TIME = 5000;

// Функция для получения случайного положительного целого числа из диапозона
const getRandomNumber = (min, max) => {
  if (min < 0) {
    return 'Минимальное число меньше нуля!';
  }

  if (min > max || min === max) {
    return 'Минимальное число больше или равно максимальному!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для проверки максимальной длины строки
const checkMaxLength = (str, maxLength) => str.length <= maxLength;

const createRandomElement = (element) => element[getRandomNumber(0, element.length - 1)];

// Функция для генерации id
const createId = () => {
  let lastId = 0;

  return () => {
    lastId += 1;

    return lastId;
  };
};

const createRandomId = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message, backgroundColor, fontSize) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = fontSize;
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = backgroundColor;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomNumber,
  checkMaxLength,
  createRandomElement,
  createId,
  createRandomId,
  isEscapeKey,
  showAlert
};
