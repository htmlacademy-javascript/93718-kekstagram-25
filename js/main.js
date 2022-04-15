import {getData} from './api.js';
import {renderPhotoMiniatures} from './photo-miniatures.js';
import {showFiltersForm} from './filters.js';
import './popup.js';
import './form.js';
import './file-upload.js';

getData ((data) => {
  renderPhotoMiniatures(data);
  showFiltersForm(data);
});
