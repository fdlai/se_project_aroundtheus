const configObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//modal profile elements
// const modalProfileTitleSpan = modalEditProfile.querySelector(
//   `#${profileTitleInput.id}-error`
// );
// const modalProfileDescriptionSpan = modalEditProfile.querySelector(
//   `#${profileDescriptionInput.id}-error`
// );

// const profileSubmitButton = modalEditProfile.querySelector(
//   ".modal__submit-button"
// );
// const addCardSubmitButton = modalAddCard.querySelector(".modal__submit-button");

//modal add-card elements
//const modalAddCardSpan = modalAddCard.querySelector(".modal__span");

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

//returns true if all inputs in a specified form are valid
function allFormInputsAreValid(config, form) {
  const inputs = [...form.querySelectorAll(config.inputSelector)];
  return inputs.every((input) => input.validity.valid);
}
console.log(allFormInputsAreValid(configObject, modalEditProfile));

function toggleSubmitButton(config, form) {
  //check if the input is valid. If not, lighten the button
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (allFormInputsAreValid(configObject, form)) {
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.classList.add(config.inactiveButtonClass);
  }
}

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
setValidationEventListeners(configObject);

/* -------------------------------------------------------------------------- */
/*                               event listeners                              */
/* -------------------------------------------------------------------------- */

// profileTitleInput.addEventListener("input", (e) => {
//   modalProfileTitleSpan.textContent = profileTitleInput.validationMessage;
//   toggleSubmitButton(configObject, modalProfileForm);
//   handleErrorVisibility(configObject, profileTitleInput);
// });

// profileDescriptionInput.addEventListener("input", (e) => {
//   modalProfileDescriptionSpan.textContent =
//     profileDescriptionInput.validationMessage;
//   toggleSubmitButton(configObject, modalProfileForm);
//   handleErrorVisibility(configObject, profileDescriptionInput);
// });

// enabling validation by calling enableValidation()
// pass all the settings on call

function enableValidation(configObject) {
  const modalForms = document.querySelectorAll(configObject.formSelector);
}

enableValidation(configObject);
