/*
To the reviewer:
Hi! I noticed that a user can input two spaces in a row or even two punctuation marks in
a row, and the validation will allow it. So I attempted to add some extra code to address
that. I added a regex pattern in the input attributes and a custom error message, if a
user enters their first character as a non-letter. I hope it’s ok to experiment and try
to add extra features in. If you have any advice or thoughts on it, I’d love to hear it.
Or if you just think I should remove it, I can do that as well.
Thank You!
*/

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const configObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

//custom error message to address users who enter only symbol characters
function customErrorMessageForTextInputs(inputElement) {
  //const symbols = /[\.,;:?!@#$%^&*()_+=\[\]{}|\\\/<>'"~`-\s]/;
  if (inputElement.value.length === 0) {
    return "Please fill out this field.";
  }
  if (inputElement.value.match(/^[a-zA-Z]$/)) {
    return "Please lengthen this text to 2 characters or more (you are currently using 1 character).";
  }
  if (inputElement.value.match(/^[^a-zA-Z]$/)) {
    return "Please use alphabet characters.";
  }
  if (inputElement.value.match(/^[^a-zA-Z]+.+/)) {
    return "Please start with alphabet characters.";
  }
}

//returns true if all inputs in a specified form are valid
function allFormInputsAreValid(config, form) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  return inputs.every((input) => input.validity.valid);
}

//greys-out the submit-button if any input is invalid
function toggleSubmitButton(config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (allFormInputsAreValid(configObject, form)) {
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.classList.add(config.inactiveButtonClass);
  }
}

//display error messages on a particular input element
function showErrorMessage(config, inputElement) {
  const errorMessage = document.querySelector(`#${inputElement.id}-error`);
  errorMessage.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
}

//remove error messages on a particular input element
function hideErrorMessage(config, inputElement) {
  const errorMessage = document.querySelector(`#${inputElement.id}-error`);
  errorMessage.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
}

//display or remove error messages from an input element
function handleErrorVisibility(config, inputElement) {
  if (inputElement.validity.valid) {
    hideErrorMessage(configObject, inputElement);
  } else {
    showErrorMessage(configObject, inputElement);
  }
}

//set an input-validation event listener on each input element within a specified form
function setValidationEventListeners(config, form) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  inputs.forEach((input) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    input.addEventListener("input", (e) => {
      errorMessage.textContent =
        input.type === "text"
          ? customErrorMessageForTextInputs(input)
          : input.validationMessage;
      toggleSubmitButton(configObject, form);
      handleErrorVisibility(configObject, input);
    });
  });
}

//pass all forms to the setValidationEventListeners function
function enableValidation(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach((form) => setValidationEventListeners(configObject, form));
}

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

enableValidation(configObject);
