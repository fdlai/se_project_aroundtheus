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
  "#modal-close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleAndDescription = document.querySelectorAll(
  "#profile-title, #profile-description"
);
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const modalProfileForm = modalEditProfile.querySelector("#modal-form");

//card elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const errorCardTemplate = document.querySelector("#error-card-template").content
  .firstElementChild;

//modal add-card elements
const modalAddCard = document.querySelector("#modal-add-card");
const profileAddButton = document.querySelector("#profile-add-button");
const modalAddCardCloseButton = modalAddCard.querySelector(
  "#modal-close-button"
);
const addCardTitleInput = modalAddCard.querySelector("#add-card-title-input");
const addCardImageLinkInput = modalAddCard.querySelector(
  "#add-card-image-link-input"
);
const modalAddCardForm = modalAddCard.querySelector("#modal-form");

//modal picture elements
const modalPicture = document.querySelector("#modal-picture");
const modalPictureImage = modalPicture.querySelector(".modal__image");
const modalPictureSubtitle = modalPicture.querySelector(".modal__subtitle");
const modalPictureCloseButton = modalPicture.querySelector(
  "#modal-close-button"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function addDeleteButton(button, elt) {
  button.addEventListener("click", () => {
    elt.remove();
  });
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementTitle.textContent = data.name;
  cardElementImage.setAttribute("src", `${data.link}`);
  cardElementImage.setAttribute("alt", `${data.name}`);

  //like-button functionality
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //delete-button functionality
  const deleteButton = cardElement.querySelector(".card__delete-button");
  addDeleteButton(deleteButton, cardElement);

  //open picture modal functionality
  cardElementImage.addEventListener("click", () => {
    modalPictureImage.setAttribute("src", `${data.link}`);
    modalPictureImage.setAttribute("alt", `${data.name}`);
    modalPictureSubtitle.textContent = data.name;
    //make sure image loads before opening modal
    modalPictureImage.onload = () => {
      openModal(modalPicture);
    };
  });

  return cardElement;
}

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
      console.log("error");
  }

  //Add an error-card if the image fails to load
  image = cardElement.querySelector(".card__image");
  image.onerror = () => {
    const errorCard = errorCardTemplate.cloneNode(true);
    const deleteButton = errorCard.querySelector(".card__delete-button");
    const errorCardTitle = errorCard.querySelector(".card__title");
    errorCardTitle.textContent = cardData.name ? cardData.name : "...";
    addDeleteButton(deleteButton, errorCard);
    cardsList.replaceChild(errorCard, cardElement);
  };
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
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
  cardData = {
    name: addCardTitleInput.value,
    link: addCardImageLinkInput.value,
  };
  renderCard(cardData, "prepend");
  closeModal(modalAddCard);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileEditOpen() {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  modalEditProfile.classList.add("modal_opened");
}

function handleProfileAddOpen() {
  modalAddCard.classList.add("modal_opened");
}

function createCardTooltip() {
  //create a tooltip for card__title that displays when text is long enough to cause ellipsis
  const cardTitles = document.querySelectorAll(".card__title");
  cardTitles.forEach(function (elt) {
    ellipsisExists = elt.scrollWidth > elt.clientWidth;
    const tooltipIsOpen =
      elt.nextElementSibling.classList.contains("card__tooltip");
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

function createProfileTitleTooltip() {
  //manage a tooltip for profile__title that displays when text is long enough to cause ellipsis
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

function createProfileDescriptionTooltip() {
  //manage a tooltip for profile__description that displays when text is long enough to cause ellipsis
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
  openModal(modalEditProfile);
});

//profile add button brings up modal
profileAddButton.addEventListener("click", () => {
  openModal(modalAddCard);
});

//allow x button on the modal to close the modal
modalProfileCloseButton.addEventListener("click", () => {
  closeModal(modalEditProfile);
});
modalAddCardCloseButton.addEventListener("click", () => {
  closeModal(modalAddCard);
});
modalPictureCloseButton.addEventListener("click", () => {
  closeModal(modalPicture);
});

//transfer profile modal input values to title and description
//and check for text ellipsis after changing profile info
modalProfileForm.addEventListener("submit", function (e) {
  handleProfileEditSubmit(e);
  createProfileTitleTooltip(e);
  createProfileDescriptionTooltip(e);
});

//create card and prepend it to card list
modalAddCardForm.addEventListener("submit", (e) => {
  handleAddCardSubmit(e);
  createCardTooltip(e);
});

//check if ellipsis is still there after resizing
window.addEventListener("resize", function (e) {
  createCardTooltip(e);
  createProfileTitleTooltip(e);
  createProfileDescriptionTooltip(e);
});

/* -------------------------------------------------------------------------- */
/*                                    Code                                    */
/* -------------------------------------------------------------------------- */

//have initialCards populate the page
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});

//create initial tooltips on page load
createProfileTitleTooltip();
createProfileDescriptionTooltip();
createCardTooltip();
