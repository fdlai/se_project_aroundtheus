import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._inputObject = {};
    this.inputElements = this._popupElement.querySelectorAll(".modal__input");
    //set event listeners in the constructor
    this.setEventListeners();
  }

  _getInputValues() {
    //collect data from all the input fields
    this.inputElements.forEach((input) => {
      this._inputObject[input.name] = input.value;
    });
    //return that data as an object
    return this._inputObject;
  }

  setEventListeners() {
    //add the submit event handler to the form
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
