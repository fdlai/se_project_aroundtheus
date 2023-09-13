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
  if (inputElement.value.match(/^[^\.,;:?!@#$%^&*()_+=\[\]{}|\\\/<>'"~`-\s]/)) {
    return "Please lengthen this text to 2 characters or more (you are currently using 1 character).";
  }
  if (inputElement.value.match(/^[\.,;:?!@#$%^&*()_+=\[\]{}|\\\/<>'"~`-\s]$/)) {
    return "Please use alphabet characters.";
  }
  if (
    inputElement.value.match(/^[\.,;:?!@#$%^&*()_+=\[\]{}|\\\/<>'"~`-\s]+.+/)
  ) {
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

//display or remove error messages from an input element
function handleErrorVisibility(config, inputElement) {
  const errorMessage = document.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    errorMessage.classList.remove(config.errorClass);
  } else {
    errorMessage.classList.add(config.errorClass);
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
