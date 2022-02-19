// Функция для получения случайного положительного целого числа из диапозона
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return console.log(Math.floor(Math.random() * (max - min + 1)) + min);
}

getRandomNumber(0, 2);

