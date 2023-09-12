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

//check if the input is valid. If not, grey-out the button
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

function setValidationEventListeners(config) {
  const inputs = [...document.querySelectorAll(config.inputSelector)];
  inputs.forEach((input) => {
    const form = input.closest(config.formSelector);
    const errorMessage = form.querySelector(`#${input.id}-error`);
    input.addEventListener("input", (e) => {
      errorMessage.textContent = input.validationMessage;
      toggleSubmitButton(configObject, form);
      handleErrorVisibility(configObject, input);
    });
  });
}

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

setValidationEventListeners(configObject);
