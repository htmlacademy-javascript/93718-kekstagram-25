const FILTERS = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const uploadPreview = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1
});

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  const filterName = uploadPreview.dataset.filterName;

  if (filterName) {
    const effect = FILTERS[filterName].effect;
    const unit = FILTERS[filterName].unit;
    uploadPreview.style.filter = `${effect}(${effectValue.value}${unit})`;
  }
});

const updateSlider = (filterValue, slider) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: filterValue.min,
      max: filterValue.max
    },
    start: filterValue.max,
    step: filterValue.step
  });
};

const effectsChangeHandler = (evt) => {
  const filterName = evt.target.value;

  if (evt.target.matches('.effects__radio')) {
    uploadPreview.className = '';
    uploadPreview.classList.add('img-upload__preview', `effects__preview--${filterName}`);
    uploadPreview.dataset.filterName = filterName;

    const filter = FILTERS[filterName];

    if (filter) {
      const effect = filter.effect;
      const value = filter.max;
      const unit = filter.unit;
      uploadPreview.style.filter = `${effect}(${value}${unit})`;

      updateSlider(filter, effectSlider);
      effectSlider.classList.remove('visually-hidden');
    } else {
      uploadPreview.style.filter = '';
      effectSlider.classList.add('visually-hidden');
    }
  }
};

export {uploadPreview, effectsList, effectSlider, effectsChangeHandler};
