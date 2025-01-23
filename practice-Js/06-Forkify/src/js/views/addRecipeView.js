import icons from '../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overly = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();

    // addHandlerShowWindow
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));

    // addHandlerHideWindow
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overly.addEventListener('click', this.toggleWindow.bind(this));

    /*
    Solution 2
    [this._btnOpen, this._btnClose, this._overly].forEach(element =>
      element.addEventListener('click', this.toggleWindow.bind(this))
    );
    */
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overly.classList.toggle('hidden');
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }
}

export default new AddRecipeView();
