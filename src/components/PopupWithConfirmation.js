import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler = () => {}) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._form = this._popupElement.querySelector(".modal__form");
    this._submitHandler = submitHandler;
    this._setEventListeners();
  }

  setSubmitHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._submitHandler) {
        this._submitHandler();
      } else {
        console.log("submitHandler has not been set");
      }
      //this.close();
    });
  }
}
