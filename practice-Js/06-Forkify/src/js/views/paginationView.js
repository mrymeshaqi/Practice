import icons from '../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages  => Next button
    if (this._currentPage === 1 && numPages > 1)
      return this._generateMarkupButtons('next');

    // Last page  => Previous button
    if (this._currentPage === numPages && numPages > 1)
      return this._generateMarkupButtons('prev');

    // Other pages  => All buttons
    if (this._currentPage < numPages)
      return `${this._generateMarkupButtons(
        'next'
      )}${this._generateMarkupButtons('prev')}`;

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButtons(type, page = this._currentPage) {
    return `
      <button data-goto="${
        type === 'next' ? page + 1 : page - 1
      }" class="btn--inline pagination__btn--${type}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
        <span>Page ${type === 'next' ? page + 1 : page - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
