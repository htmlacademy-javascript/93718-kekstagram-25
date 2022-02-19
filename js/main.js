// Функция для получения случайного положительного целого числа из диапозона
function getRandomNumber(min, max) {
	if (min < 0) {
  	return console.log('Минимальное число меньше нуля!')
  }

  if (min > max || min === max) {
  	return console.log('Минимальное число больше или равно максимальному!')
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return console.log(Math.floor(Math.random() * (max - min + 1)) + min);
}

getRandomNumber(0, 2);
getRandomNumber(-2, 2);
getRandomNumber(2, 2);
getRandomNumber(3, 2);

