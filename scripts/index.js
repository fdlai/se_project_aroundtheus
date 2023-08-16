const initialCards = [
  { name: "El Capitan", link: "https://unsplash.com/photos/ndN00KmbJ1c" },
  {
    name: "Lake Atitl\u00E1n",
    link: "https://unsplash.com/photos/K2s_YE031CA",
  },
  { name: "Banff, Canada", link: "https://unsplash.com/photos/pp_oXEb2H48" },
  {
    name: "Ventura, United States",
    link: "https://unsplash.com/photos/FO7bKvgETgQ",
  },
  {
    name: "Waimea State Recreation Pier",
    link: "https://unsplash.com/photos/fsJB3KT2rj8",
  },
  {
    name: "Wanaka, New Zealand",
    link: "https://unsplash.com/photos/St08jKkPVHw",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const modalEditProfile = document.querySelector("#modal-edit-profile");
const profileEditButton = document.querySelector("#profile-edit-button");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const modalForm = modalEditProfile.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModalEditProfile() {
  modalEditProfile.classList.remove("modal__opened");
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModalEditProfile();
}

function handleProfileEditOpen() {
  profileTitleInput.value = profileTitle.textContent.trimStart();
  profileDescriptionInput.value = profileDescription.textContent.trimStart();
  modalEditProfile.classList.add("modal__opened");
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile button populates the inputs and brings up the modal.
profileEditButton.addEventListener("click", handleProfileEditOpen);

//allow x button on the modal to close the modal
modalCloseButton.addEventListener("click", closeModalEditProfile);

//transfer modal input values to title and description
modalForm.addEventListener("submit", handleProfileEditSubmit);

//have initialCards populate the page
initialCards.forEach(function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementTitle.textContent = data.name;
  cardElementImage.setAttribute("src", `${data.link}`);
  cardsList.append(cardElement);
});
