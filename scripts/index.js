import Card from "../components/card.js";
const obj1 = {
  name: "El Capitan",
  link: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
};
const card1 = new Card(obj1, "#card-template", addPictureModalFunctionality);

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
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

//click button to delete element
function addDeleteFunctionality(button, element) {
  button.addEventListener("click", () => {
    element.remove();
  });
}

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

function getCardElement(cardData) {
  //create card, give it its name and image
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementTitle.textContent = cardData.name;
  cardElementImage.setAttribute("src", `${cardData.link}`);
  cardElementImage.setAttribute("alt", `${cardData.name}`);

  //like-button functionality
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //delete-button functionality
  const deleteButton = cardElement.querySelector(".card__delete-button");
  addDeleteFunctionality(deleteButton, cardElement);

  //picture-modal functionality
  addPictureModalFunctionality(cardElementImage, cardData);

  //use error-card if the image fails to load
  cardElementImage.onerror = () =>
    replaceWithErrorCard(cardElement, "Image has failed to load");

  return cardElement;
}

//replaces card with error-card
function replaceWithErrorCard(card, errorMessage = "Error") {
  const errorCard = errorCardTemplate.cloneNode(true);
  const errorCardMessage = errorCard.querySelector(".card__error-message");
  const deleteButton = errorCard.querySelector(".card__delete-button");
  const errorCardTitle = errorCard.querySelector(".card__title");
  errorCardMessage.textContent = errorMessage;
  errorCardTitle.textContent = card.innerText ? card.textContent : "...";
  addDeleteFunctionality(deleteButton, errorCard);
  card.replaceWith(errorCard);
}

//appends or prepends card to wrapper
function renderCard(cardData, placement = "append", wrapper = cardsList) {
  const cardElement = getCardElement(cardData);
  switch (placement) {
    case "append":
      wrapper.append(cardElement);
      break;
    case "prepend":
      wrapper.prepend(cardElement);
      break;
    default:
      console.log("Error. Please use only 'append' or 'prepend'.");
  }
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
  renderCard(cardData, "prepend");
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
  resetFormValidation(configObject, modalProfileForm, false);
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
  createProfileTitleTooltip();
  createProfileDescriptionTooltip();
});

//create card and prepend it to card list
modalAddCardForm.addEventListener("submit", (e) => {
  handleAddCardSubmit(e);
  createCardTooltip();
  resetFormValidation(configObject, modalAddCardForm, true);
});

//check if text ellipsis is there after resizing
window.addEventListener("resize", () => {
  createCardTooltip();
  createProfileTitleTooltip();
  createProfileDescriptionTooltip();
});

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

// //have initialCards render
// initialCards.forEach((cardData) => {
//   renderCard(cardData, "append");
// });

//create initial tooltips on page load
createProfileTitleTooltip();
createProfileDescriptionTooltip();
createCardTooltip();

//module related code:
//have initialCards render

initialCards.forEach((cardData) => {
  const card = new Card(
    cardData,
    "#card-template",
    addPictureModalFunctionality
  );
  card.renderCard("append", cardsList);
});
