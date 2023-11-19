import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._inputObject = {};
    this._inputElements = [
      ...this._popupElement.querySelectorAll(".modal__input"),
    ];
    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._defaultSubmitButtonText = this._submitButton.textContent;
    //set event listeners in the constructor
    this.setEventListeners();
  }
  //return array of all input elements
  getInputElements() {
    return this._inputElements;
  }
  //return an object containing the user-inputted text
  _getInputValues() {
    this._inputElements.forEach((input) => {
      this._inputObject[input.name] = input.value;
    });
    return this._inputObject;
  }
  //set the user-typed-in text content of the input elements
  //data is an object with keynames equal to the name attribute on each input element
  setInputValues(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.name];
    });
  }

  getInputElementAttributeNames() {
    const attributeNames = [];
    this._inputElements.forEach((input) => {
      attributeNames.push(input.name);
    });
    return attributeNames;
  }

  _changeSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  async applySavingAnimation() {
    this._submitButton.classList.add("modal__submit-button_animation_active");
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this._submitButton.classList.remove(
          "modal__submit-button_animation_active"
        );
        this._submitButton.classList.add("modal__submit-button_saved");
        resolve();
      }, 1700);
    });
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  open() {
    if (this._submitButton.textContent !== this._defaultSubmitButtonText) {
      this._changeSubmitButtonText(this._defaultSubmitButtonText);
    }
    if (this._submitButton.classList.contains("modal__submit-button_saved")) {
      this._submitButton.classList.remove("modal__submit-button_saved");
    }
    super.open();
  }

  setEventListeners() {
    //add the submit event handler to the form
    this._formElement.addEventListener("submit", async (e) => {
      //this._changeSubmitButtonText("Saving...");
      e.preventDefault();
      await this._handleFormSubmit(this._getInputValues()), this.close();
    });
    super.setEventListeners();
  }
}
