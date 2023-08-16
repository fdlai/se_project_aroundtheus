const initialCards = [
  {
    name: "El Capitan",
    link: "https://www.socwall.com/images/wallpapers/6967-2560x1600.jpg",
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

const modalEditProfile = document.querySelector("#modal-edit-profile");
const profileEditButton = document.querySelector("#profile-edit-button");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleAndDescription = document.querySelectorAll(
  "#profile-title, #profile-description"
);
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const modalForm = modalEditProfile.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
let cardTitles;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModalEditProfile() {
  modalEditProfile.classList.remove("modal__opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementTitle.textContent = data.name;
  cardElementImage.setAttribute("src", `${data.link}`);
  cardElementImage.setAttribute("alt", `${data.name}`);
  cardsList.append(cardElement);
}

function createCardTooltip(elt) {
  //create a tooltip for card__title that displays when text is long enough to cause ellipsis
  if (elt.scrollWidth > elt.offsetWidth) {
    const cardTooltip = document.createElement("div");
    cardTooltip.classList.add("card__tooltip");
    cardTooltip.textContent = elt.textContent;
    elt.appendChild(cardTooltip);
  }
}

function createProfileTitleTooltip() {
  //manage a tooltip for profile__title that displays when text is long enough to cause ellipsis
  const ellipsisExists = profileTitle.scrollWidth > profileTitle.offsetWidth;
  const tooltipIsOpen =
    document.querySelector(".profile__tooltip-title") !== null;
  if (ellipsisExists && !tooltipIsOpen) {
    const profileTooltip = document.createElement("div");
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
    const profileTooltip = document.createElement("div");
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
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  createProfileTitleTooltip();
  createProfileDescriptionTooltip();
  closeModalEditProfile();
}

function handleProfileEditOpen() {
  profileTitleInput.value = profileTitle.textContent.trimStart();
  profileDescriptionInput.value = profileDescription.textContent.trimStart();
  modalEditProfile.classList.add("modal__opened");
}

function setImageHeight() {
  //makes all images square, in order to handle images of different aspect ratios
  const cardImages = document.querySelectorAll(".card__image");
  cardImages.forEach(function (image) {
    const width = image.offsetWidth;
    image.style.height = width + "px";
  });
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

//update image heights when the window is resized
window.addEventListener("resize", setImageHeight);

/* -------------------------------------------------------------------------- */
/*                                    Code                                    */
/* -------------------------------------------------------------------------- */

//have initialCards populate the page
initialCards.forEach(getCardElement);

//set initial heights of images
setImageHeight();

//create initial tooltips on page load
createProfileTitleTooltip();
createProfileDescriptionTooltip();
cardTitles = document.querySelectorAll(".card__title"); //must be put after initialCards has populated the page
cardTitles.forEach(createCardTooltip);
