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

const modalEditProfile = document.querySelector("#modal-edit-profile");
const profileEditButton = document.querySelector("#profile__edit-button");
const modalCloseButton = document.querySelector("#modal__close-button");

//allow edit profile button to bring up the modal
profileEditButton.addEventListener("click", function () {
  modalEditProfile.classList.add("modal__opened");
});

//allow x button on the modal to close the modal
modalCloseButton.addEventListener("click", function () {
  modalEditProfile.classList.remove("modal__opened");
});
