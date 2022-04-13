const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

const filtersButtonShowHandler = (evt) => {
  evt.preventDefault();

  if (!evt.target.className.match('img-filters__button--active') && evt.target.className.match('img-filters__button')) {
    const arrayButtons = Array.from(filtersButton);

    arrayButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    evt.target.classList.add('img-filters__button--active');
  }
};

const showFiltersForm = () => {
  filter.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', filtersButtonShowHandler);
};

export {showFiltersForm};
