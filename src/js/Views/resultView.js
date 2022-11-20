import View from './View.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'no recipe found for your quary! Please try again ;)';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    console.log(results);
    return ` 
        <li class="preview">
            <a class="preview__link" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="${results.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
              </div>
            </a>
        </li>`;
  }
}

export default new ResultView();
