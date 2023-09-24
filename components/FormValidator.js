export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputs = [
      ...this._form.querySelectorAll(this._settings.inputSelector),
    ];
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  //returns true if all inputs in a specified form are valid
  _allFormInputsAreValid() {
    return this._inputs.every((input) => input.validity.valid);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  //disables submit-button if any input is invalid
  _toggleSubmitButton() {
    if (this._allFormInputsAreValid()) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  //display error messages on a particular input element
  _showErrorMessage(inputElement) {
    const errorMessage = this._form.querySelector(`#${inputElement.id}-error`);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  //remove error messages on a particular input element
  _hideErrorMessage(inputElement) {
    const errorMessage = this._form.querySelector(`#${inputElement.id}-error`);
    errorMessage.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  //display or remove error messages from an input element
  _handleErrorVisibility(inputElement) {
    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    } else {
      this._showErrorMessage(inputElement);
    }
  }

  //reset validation of a specified form. If parameter 'emptyInputs' is true => then empty the form's inputs
  resetFormValidation(emptyInputs = true) {
    if (emptyInputs) {
      this._form.reset();
    }
    this._toggleSubmitButton();
    this._inputs.forEach((input) => {
      this._hideErrorMessage(input);
    });
  }

  //set an input-validation event listener on each input element within a specified form
  _setValidationEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this._toggleSubmitButton();
        this._handleErrorVisibility(input);
      });
    });
  }

  //call the setValidationEventListeners function
  _enableValidation() {
    this._setValidationEventListeners();
  }
}
