import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import TooltipHandler from "../components/TooltipHandler.js";

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
const modalEditProfile = document.querySelector("#modal-edit-profile");
const profileEditButton = document.querySelector("#profile-edit-button");
const modalProfileCloseButton = modalEditProfile.querySelector(
  ".modal__close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const modalProfileForm = document.forms["modal-profile-form"];

//card elements
const cardsList = document.querySelector(".cards__list");
const template = document.querySelector("#card-template").content;
const cardTemplate = template.querySelector(".card");
const errorCardTemplate = document.querySelector("#error-card-template").content
  .firstElementChild;

//modal add-card elements
const modalAddCard = document.querySelector("#modal-add-card");
const profileAddButton = document.querySelector("#profile-add-button");
const modalAddCardCloseButton = modalAddCard.querySelector(
  ".modal__close-button"
);
const addCardTitleInput = modalAddCard.querySelector("#add-card-title-input");
const addCardImageLinkInput = modalAddCard.querySelector(
  "#add-card-image-link-input"
);
const modalAddCardForm = document.forms["modal-add-card-form"];

//modal picture elements
const modalPicture = document.querySelector("#modal-picture");
const modalPictureImage = modalPicture.querySelector(".modal__image");
const modalPictureSubtitle = modalPicture.querySelector(".modal__subtitle");
const modalPictureCloseButton = modalPicture.querySelector(
  ".modal__close-button"
);

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

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

//display image in picture-modal
function clickToOpenPictureModal(image) {
  //note: image parameter is an object with image.name and image.link
  modalPictureImage.setAttribute("src", `${image.link}`);
  modalPictureImage.setAttribute("alt", `${image.name}`);
  modalPictureSubtitle.textContent = image.name;
  //make sure image loads before opening modal
  modalPictureImage.onload = () => {
    openModal(modalPicture);
  };
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

function clickToCloseModal(event) {
  if (
    event.target.classList.contains("modal_opened") ||
    event.target.classList.contains("modal__close-button")
  ) {
    closeModal(event.currentTarget);
  }
}

function pressEscToCloseModal(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.addEventListener("mousedown", clickToCloseModal);
  document.addEventListener("keydown", pressEscToCloseModal);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.removeEventListener("mousedown", clickToCloseModal);
  document.removeEventListener("keydown", pressEscToCloseModal);
  modal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(modalEditProfile);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: addCardTitleInput.value,
    link: addCardImageLinkInput.value,
  };
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
  closeModal(modalAddCard);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile button populates the inputs and brings up the modal.
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  formValidators["modal-profile-form"].resetFormValidation(false);
  openModal(modalEditProfile);
});

//profile add button brings up modal
profileAddButton.addEventListener("click", () => {
  openModal(modalAddCard);
});

//allow user input of profile name and description.
//also check for text ellipsis after changing profile info
modalProfileForm.addEventListener("submit", (e) => {
  handleProfileEditSubmit(e);
  profileTitleTooltipHandler.handleTooltip();
  profileDescriptionTooltipHandler.handleTooltip();
});

//create card and prepend it to card list
modalAddCardForm.addEventListener("submit", (e) => {
  handleAddCardSubmit(e);
  cardTooltipHandler.handleTooltip();
  formValidators["modal-add-card-form"].resetFormValidation(true);
});

//check if text ellipsis is there after resizing
window.addEventListener("resize", () => {
  cardTooltipHandler.handleTooltip();
  profileTitleTooltipHandler.handleTooltip();
  profileDescriptionTooltipHandler.handleTooltip();
});

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

//have initialCards render
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsList.append(cardElement);
});

//enable form validation
enableValidationOnAllForms(configObject);

//create initial tooltips on page load
cardTooltipHandler.handleTooltip();
profileTitleTooltipHandler.handleTooltip();
profileDescriptionTooltipHandler.handleTooltip();
