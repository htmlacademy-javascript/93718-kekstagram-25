const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const selectPhoto = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

selectPhoto.addEventListener('change', () => {
  const file = selectPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((elem) => fileName.endsWith(elem));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

