import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data;
    const numPage = Math.ceil(
      currPage.results.length / currPage.resultsPerPages
    );

    // 1. if there is 1 page or other
    if (currPage.page === 1 && numPage > 1) {
      return `
            <button data-goto=${
              currPage.page + 1
            } class="btn--inline pagination__btn--next">
                <span>Page ${currPage.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
      `;
    }
    // 2. last page
    if (currPage.page === numPage && numPage > 1) {
      return `
            <button data-goto=${
              currPage.page - 1
            } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage.page - 1}</span>
            </button>
        `;
    }
    // 3. other page
    if (currPage.page < numPage) {
      return ` 
            <button data-goto=${
              currPage.page - 1
            } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage.page - 1}</span>
            </button>
            <button data-goto=${
              currPage.page + 1
            } class="btn--inline pagination__btn--next">
                <span>Page ${currPage.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
    }
    // 4. if there is no page
    return `no page`;
  }
}

export default new PaginationView();
