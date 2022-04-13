const filter = document.querySelector('.img-filters');
const filtersForm = filter.querySelector('.img-filters__form');
const filtersButton = filtersForm.querySelectorAll('.img-filters__button');

const showFiltersForm = () => {
  filter.classList.remove('img-filters--inactive');
};

export {showFiltersForm};
