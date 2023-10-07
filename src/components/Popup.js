export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }
  //opens popup
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.add("modal_opened");
  }
  //closes popup
  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.remove("modal_opened");
  }
  //closes popup when clicking X or overlay
  _clickToCloseModal(event) {
    if (
      event.target === this._popupElement ||
      event.target === this._closeButton
    ) {
      this.close();
    }
  }
  //close popup with Esc key
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  //set event listeners to close popup when clicking X or the overlay
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      this._clickToCloseModal(e);
    });
  }
}
