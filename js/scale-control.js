const SCALE_CONTROL_STEP = 25;
const MIN_SCALE_CONTROL = 25;
const MAX_SCALE_CONTROL = 100;

const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const changeImagePreview = (scale) => {
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
};

const scaleDecreaseHandler = () => {
  let scale = parseInt(scaleControlValue.value, 10);

  if (scale > MIN_SCALE_CONTROL) {
    scale -= SCALE_CONTROL_STEP;
    scaleControlValue.value = `${scale}%`;
    changeImagePreview (scale);
  }
};

const scaleIncreaseHandler = () => {
  let scale = parseInt(scaleControlValue.value, 10);

  if (scale < MAX_SCALE_CONTROL) {
    scale += SCALE_CONTROL_STEP;
    scaleControlValue.value = `${scale}%`;
    changeImagePreview (scale);
  }
};

export {scaleControlSmaller, scaleControlBigger, changeImagePreview, scaleDecreaseHandler, scaleIncreaseHandler};
