import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import TooltipHandler from "../components/TooltipHandler.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "El Capitan",
    link: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Wanaka, New Zealand",
    link: "https://www.wallpaperup.com/uploads/wallpapers/2013/09/25/151365/348f3c49b5e5d78bae772578dc1e9d36.jpg",
  },
  {
    name: "Lake Atitl\u00E1n",
    link: "https://www.roadaffair.com/wp-content/uploads/2017/10/lake-atitlan-guatemala-shutterstock_189649244.jpg",
  },
  {
    name: "Banff, Canada",
    link: "https://i2.wp.com/www.erikastravels.com/wp-content/uploads/2015/11/P1170327.jpg",
  },
  {
    name: "Grand Canyon",
    link: "https://www.wallpaperflare.com/static/15/193/266/arches-national-park-utah-rock-nature-wallpaper.jpg",
  },
  {
    name: "Amazon Rainforest",
    link: "https://foundtheworld.com/wp-content/uploads/2015/12/Amazon-Rainforest-9.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

//modal profile elements
const profileEditButton = document.querySelector("#profile-edit-button");
const modalProfileForm = document.forms["modal-profile-form"];

//modal add-card elements
const profileAddButton = document.querySelector("#profile-add-button");
const modalAddCardForm = document.forms["modal-add-card-form"];

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */

const configObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

//display image in picture-modal
function clickToOpenPictureModal(image) {
  imagePopup.open(image);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", clickToOpenPictureModal);
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

function handleProfileEditSubmit({ title, description }) {
  profileUserInfo.setUserInfo(title, description);
  profileTitleTooltipHandler.handleTooltip();
  profileDescriptionTooltipHandler.handleTooltip();
}

function handleAddCardSubmit({ title, imageLink }) {
  const cardElement = createCard({ name: title, link: imageLink });
  cardSection.addItem(cardElement, "prepend");
  cardTooltipHandler.handleTooltip();
  formValidators["modal-add-card-form"].resetFormValidation(true);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile button populates the inputs and brings up the modal.
profileEditButton.addEventListener("click", () => {
  const { name, description } = profileUserInfo.getUserInfo();
  const [inputNameElement, inputDescriptionElement] =
    profileEditPopup.inputElements;
  inputNameElement.value = name.trim();
  inputDescriptionElement.value = description.trim();
  formValidators["modal-profile-form"].resetFormValidation(false);
  profileEditPopup.open();
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
