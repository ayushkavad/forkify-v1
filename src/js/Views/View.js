import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  spinnerRender() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
      `;
    this._appendMarkup(markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
      <div class="error">
         <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
    this._appendMarkup(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="error">
         <div>
          <svg>
            <use href="${icons}#icon-smile></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
    this._appendMarkup(markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  _appendMarkup(markup) {
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
