import Popup from "./Popup.js";

export default class PopupWithMessage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._textMessage = this._popupElement.querySelector(".modal__heading");
    this.setEventListeners();
  }

  setMessage(message) {
    this._textMessage.textContent = message;
  }
}
