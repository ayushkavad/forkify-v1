class searchView {
  #parantEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parantEl.querySelector('.search__field').value;
    this.#clearField();
    return query;
  }

  #clearField() {
    this.#parantEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parantEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
