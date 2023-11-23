import Popup from "./Popup.js";

export default class PopupWithMessage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._textMessage = this._popupElement.querySelector(
      ".modal__heading_type_message"
    );
    this.setEventListeners();
  }

  setMessage(message) {
    if (this._textMessage.textContent === "") {
      this._textMessage.textContent = message;
    } else {
      this._textMessage.innerHTML =
        this._textMessage.textContent + "<br><br>" + message;
    }
  }

  close() {
    this._textMessage.textContent = "";
    super.close();
  }
}
