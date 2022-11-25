import View from './View.js';
import previewView from './previewView.js';

class BookMarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'no bookmarks yet! find nice recipe and bookmake it ;)';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarkView();
