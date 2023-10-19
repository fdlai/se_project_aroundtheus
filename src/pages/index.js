//import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import TooltipHandler from "../components/TooltipHandler.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, configObject } from "../utils/constants.js";
//import zipObject from "lodash/zipObject.js";
//import zipObject from "../../node_modules/lodash/zipObject.js";
//const zipObject = require("lodash/zipObject");
/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector("#profile-add-button");

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */

const formValidators = {};

const cardTooltipHandler = new TooltipHandler(
  ".card__title",
  ".card__tooltip",
  false
);
const profileTitleTooltipHandler = new TooltipHandler(
  "#profile-title",
  ".profile__tooltip-title"
);
const profileDescriptionTooltipHandler = new TooltipHandler(
  "#profile-description",
  ".profile__tooltip-description"
);

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
const profileEditPopup = new PopupWithForm(
  "#modal-edit-profile",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm("#modal-add-card", handleAddCardSubmit);
const imagePopup = new PopupWithImage("#modal-picture");
const profileUserInfo = new UserInfo("#profile-title", "#profile-description");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (cardData) =>
    imagePopup.open(cardData)
  );
  return card.getCardElement();
}

//enable input validation for all forms
function enableValidationOnAllForms(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach((form) => {
    const formValidator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    //add validators for all forms
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

//handle form submits. Class interactions handled through loose coupling
function handleProfileEditSubmit({ title, description }) {
  profileUserInfo.setUserInfo(title, description);
  profileTitleTooltipHandler.handleTooltip();
  profileDescriptionTooltipHandler.handleTooltip();
}

function handleAddCardSubmit({ title, imageLink }) {
  cardSection.addItem({ name: title, link: imageLink }, "prepend");
  cardTooltipHandler.handleTooltip();
  formValidators["modal-add-card-form"].resetFormValidation(true);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile button populates the inputs and brings up the modal.
profileEditButton.addEventListener("click", () => {
  //const { name: title, description } = profileUserInfo.getUserInfo();
  //profileEditPopup.setInputValues({ title, description });
  const infoFromUserClass = profileUserInfo.getUserInfo();
  const infoForPopupClass = {
    title: infoFromUserClass.name,
    description: infoFromUserClass.description,
  };
  profileEditPopup.setInputValues(infoForPopupClass);
  formValidators["modal-profile-form"].resetFormValidation(false);
  profileEditPopup.open();

  console.log(profileEditPopup.getInputElementAttributeNames());
  console.log(addCardPopup.getInputElementAttributeNames());
});

//profile add button brings up modal
profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

//check for text ellipsis after resizing
window.addEventListener("resize", () => {
  cardTooltipHandler.handleTooltip();
  profileTitleTooltipHandler.handleTooltip();
  profileDescriptionTooltipHandler.handleTooltip();
});

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

//have initialCards render
cardSection.renderItems();

//enable form validation
enableValidationOnAllForms(configObject);

//create initial tooltips on page load
cardTooltipHandler.handleTooltip();
profileTitleTooltipHandler.handleTooltip();
profileDescriptionTooltipHandler.handleTooltip();
