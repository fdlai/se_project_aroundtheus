import Card from "../components/card.js";
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
const modalProfileForm = modalEditProfile.querySelector("#modal-profile-form");

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
const modalAddCardForm = modalAddCard.querySelector("#modal-add-card-form");

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

const profileEditFormValidator = new FormValidator(
  configObject,
  modalProfileForm
);
const addCardFormValidator = new FormValidator(configObject, modalAddCardForm);

const cardTooltipHandler = new TooltipHandler(".card__title", ".card__tooltip");
const profileTitleTooltipHandler = new TooltipHandler(
  "#profile-title",
  ".profile__tooltip-title",
  profileTitleInput
);
const profileDescriptionTooltipHandler = new TooltipHandler(
  "#profile-description",
  ".profile__tooltip-description",
  profileDescriptionInput
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

//click button to display image in picture-modal
function addPictureModalFunctionality(button, image) {
  //note: image parameter is an object with image.name and image.link
  button.addEventListener("click", () => {
    modalPictureImage.setAttribute("src", `${image.link}`);
    modalPictureImage.setAttribute("alt", `${image.name}`);
    modalPictureSubtitle.textContent = image.name;
    //make sure image loads before opening modal
    modalPictureImage.onload = () => {
      openModal(modalPicture);
    };
  });
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function clickToCloseModal(event) {
  const modal = document.querySelector(".modal_opened");
  if (
    event.target.classList.contains("modal_opened") ||
    event.target.classList.contains("modal__close-button")
  ) {
    closeModal(modal);
  }
}

function escapeToCloseModal(event) {
  const modal = document.querySelector(".modal_opened");
  if (event.key === "Escape") {
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.addEventListener("mousedown", clickToCloseModal);
  document.addEventListener("keydown", escapeToCloseModal);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.removeEventListener("mousedown", clickToCloseModal);
  document.removeEventListener("keydown", escapeToCloseModal);
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
  const card = new Card(
    cardData,
    "#card-template",
    addPictureModalFunctionality
  );
  card.renderCard("prepend", cardsList);
  closeModal(modalAddCard);
}

//create a tooltip for card__title that displays when text is long enough to cause ellipsis
function createCardTooltip() {
  const cardTitles = document.querySelectorAll(".card__title");
  cardTitles.forEach((elt) => {
    const ellipsisExists = elt.scrollWidth > elt.clientWidth;
    const tooltipIsOpen = elt.parentNode.querySelector(".card__tooltip");
    if (ellipsisExists && !tooltipIsOpen) {
      const cardTooltip = document.createElement("p");
      cardTooltip.classList.add("card__tooltip");
      cardTooltip.textContent = elt.textContent;
      elt.after(cardTooltip);
    } else if (!ellipsisExists && tooltipIsOpen) {
      const cardTooltip = elt.nextElementSibling;
      cardTooltip.remove();
    }
  });
}

//manage a tooltip for profile__title that displays when text is long enough to cause ellipsis
function createProfileTitleTooltip() {
  const ellipsisExists = profileTitle.scrollWidth > profileTitle.offsetWidth;
  const tooltipIsOpen =
    document.querySelector(".profile__tooltip-title") !== null;
  if (ellipsisExists && !tooltipIsOpen) {
    const profileTooltip = document.createElement("p");
    profileTooltip.classList.add("profile__tooltip-title");
    profileTooltip.textContent = profileTitle.textContent;
    profileTitle.after(profileTooltip);
  } else if (ellipsisExists && tooltipIsOpen) {
    const profileTooltip = document.querySelector(".profile__tooltip-title");
    profileTooltip.textContent = profileTitleInput.value;
  } else if (!ellipsisExists && tooltipIsOpen) {
    const profileTooltip = document.querySelector(".profile__tooltip-title");
    profileTooltip.remove();
  }
}

//manage a tooltip for profile__description that displays when text is long enough to cause ellipsis
function createProfileDescriptionTooltip() {
  const ellipsisExists =
    profileDescription.scrollWidth > profileDescription.offsetWidth;
  const tooltipIsOpen =
    document.querySelector(".profile__tooltip-description") !== null;
  if (ellipsisExists && !tooltipIsOpen) {
    const profileTooltip = document.createElement("p");
    profileTooltip.classList.add("profile__tooltip-description");
    profileTooltip.textContent = profileDescription.textContent;
    profileDescription.after(profileTooltip);
  } else if (ellipsisExists && tooltipIsOpen) {
    const profileTooltip = document.querySelector(
      ".profile__tooltip-description"
    );
    profileTooltip.textContent = profileDescriptionInput.value;
  } else if (!ellipsisExists && tooltipIsOpen) {
    const profileTooltip = document.querySelector(
      ".profile__tooltip-description"
    );
    profileTooltip.remove();
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile button populates the inputs and brings up the modal.
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditFormValidator.resetFormValidation(false);
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
  addCardFormValidator.resetFormValidation(true);
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
  const card = new Card(
    cardData,
    "#card-template",
    addPictureModalFunctionality
  );
  card.renderCard("append", cardsList);
});

//enable form validation
const forms = [...document.querySelectorAll(configObject.formSelector)];
forms.forEach((form) => {
  const formValidator = new FormValidator(configObject, form);
  formValidator._enableValidation();
});

//create initial tooltips on page load
cardTooltipHandler.handleTooltip();
profileTitleTooltipHandler.handleTooltip();
profileDescriptionTooltipHandler.handleTooltip();
