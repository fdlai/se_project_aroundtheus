/*
To the reviewer:
Thank you for all the suggestions!
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

//returns true if all inputs in a specified form are valid
function allFormInputsAreValid(config, form) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  return inputs.every((input) => input.validity.valid);
}

//greys-out the submit-button if any input is invalid
function toggleSubmitButton(config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (allFormInputsAreValid(config, form)) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

//display error messages on a particular input element
function showErrorMessage(config, inputElement) {
  const errorMessage = document.querySelector(`#${inputElement.id}-error`);
  errorMessage.textContent = inputElement.validationMessage;
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
    hideErrorMessage(config, inputElement);
  } else {
    showErrorMessage(config, inputElement);
  }
}

//reset validation of a specified form. If parameter 'emptyInputs' is true => then empty the form's inputs
function resetFormValidation(config, form, emptyInputs = true) {
  if (emptyInputs) {
    form.reset();
  }
  toggleSubmitButton(config, form);
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  inputs.forEach((input) => {
    hideErrorMessage(config, input);
  });
}

//set an input-validation event listener on each input element within a specified form
function setValidationEventListeners(config, form) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      toggleSubmitButton(config, form);
      handleErrorVisibility(config, input);
    });
  });
}

//pass all forms to the setValidationEventListeners function
function enableValidation(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach((form) => setValidationEventListeners(config, form));
}

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

enableValidation(configObject);
