import {getData} from './api.js';
import {renderPhotoMiniatures} from './photo-miniatures.js';
import './popup.js';
import './form.js';

getData ((data) => {
  renderPhotoMiniatures(data);
});
