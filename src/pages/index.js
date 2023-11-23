import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import TooltipHandler from "../components/TooltipHandler.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithMessage from "../components/PopupWithMessage.js";
import { initialCards, configObject, apiSettings } from "../utils/constants.js";
//import {zipObject} from "lodash";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector("#profile-add-button");
const profileImage = document.querySelector(".profile__image");

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */

const formValidators = {};

const siteApi = new Api(apiSettings);

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

let cardSection;

const profileEditPopup = new PopupWithForm(
  "#modal-edit-profile",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm("#modal-add-card", handleAddCardSubmit);
const imagePopup = new PopupWithImage("#modal-picture");
const confirmCardDeletePopup = new PopupWithConfirmation("#modal-card-delete");
const profilePicturePopup = new PopupWithForm(
  "#modal-profile-picture",
  handleProfilePictureSubmit
);
const errorMessagePopup = new PopupWithMessage("#modal-message");
const profileUserInfo = new UserInfo(
  "#profile-title",
  "#profile-description",
  ".profile__image"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (cardData) => imagePopup.open(cardData),
    handleTrashButtonClick,
    handleLikeButtonClick
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

async function setUserInfoFromApi() {
  try {
    const apiUserInfo = await siteApi.fetchUserInfo();
    profileUserInfo.setUserInfo({
      userName: apiUserInfo.name,
      userDescription: apiUserInfo.about,
      userImageUrl: apiUserInfo.avatar,
    });
  } catch (err) {
    console.log("Failed to get user info: ", err);
    errorMessagePopup.setMessage(
      `Error ${err.status}. Could not retrieve user info.`
    );
    errorMessagePopup.open();
  }
}

async function initializeCards() {
  try {
    const initialCards = await siteApi.getInitialCards();
    cardSection = new Section(
      { items: initialCards, renderer: createCard },
      ".cards__list"
    );
    cardSection.renderItems();
  } catch (err) {
    console.log("Failed to get cards: ", err);
    errorMessagePopup.setMessage(
      `Error ${err.status}. Could not retrieve cards.`
    );
    errorMessagePopup.open();
  }
}

async function handleTrashButtonClick(card) {
  confirmCardDeletePopup.open();
  confirmCardDeletePopup.setSubmitHandler(async () => {
    try {
      await siteApi.deleteCard(card.id);
      card.deleteCard();
      confirmCardDeletePopup.close();
    } catch (err) {
      console.log("Failed to delete card: ", err);
      errorMessagePopup.setMessage(
        `Error ${err.status}. Could not delete card.`
      );
      errorMessagePopup.open();
    }
  });
}

async function handleLikeButtonClick(card, likeButtonStateActive) {
  if (likeButtonStateActive) {
    return siteApi.unlikeCard(card.id).catch((err) => {
      console.log("Error! Failed to unlike button: ", err);
      errorMessagePopup.setMessage(
        `Error ${err.status}. Could not unlike card.`
      );
      errorMessagePopup.open();
      throw err;
    });
  } else {
    return siteApi.likeCard(card.id).catch((err) => {
      console.log("Error! Failed to like button: ", err);
      errorMessagePopup.setMessage(`Error ${err.status}. Could not like card.`);
      errorMessagePopup.open();
      throw err;
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

//handle form submits. Class interactions handled through loose coupling
async function handleProfileEditSubmit({ title, description }) {
  try {
    const fetchRequest = siteApi.updateUserInfo(title, description);
    await profileEditPopup.applySavingAnimation(fetchRequest);
    profileUserInfo.setUserInfo({
      userName: title,
      userDescription: description,
    });
    profileTitleTooltipHandler.handleTooltip();
    profileDescriptionTooltipHandler.handleTooltip();
  } catch (err) {
    console.log("Failed to update user info: ", err);
    errorMessagePopup.setMessage(
      `Error ${err.status}. Error setting user info.`
    );
    errorMessagePopup.open();
    throw err;
  }
}

async function handleAddCardSubmit({ title, imageLink }) {
  try {
    const cardData = { name: title, link: imageLink };
    const fetchRequest = siteApi.addCard(cardData);
    const card = await addCardPopup.applySavingAnimation(fetchRequest);
    cardSection.addItem(card, "prepend");
    cardTooltipHandler.handleTooltip();
    formValidators["modal-add-card-form"].resetFormValidation(true);
  } catch (err) {
    console.error("Error! Could not add a card: ", err);
    errorMessagePopup.setMessage(`Error ${err.status}. Could not add card.`);
    errorMessagePopup.open();
    throw err;
  }
}

async function handleProfilePictureSubmit(inputValues) {
  try {
    const fetchRequest = siteApi.changeAvatar(inputValues.imageLink);
    await profilePicturePopup.applySavingAnimation(fetchRequest);
    profileUserInfo.setUserInfo({ userImageUrl: inputValues.imageLink });
    formValidators["modal-profile-picture-form"].resetFormValidation(true);
  } catch (err) {
    console.log("Could not change avatar image: ", err);
    errorMessagePopup.setMessage(
      `Error ${err.status}. Could not change profile picture.`
    );
    errorMessagePopup.open();
    throw err;
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile button populates the inputs and brings up the modal.
profileEditButton.addEventListener("click", () => {
  const infoFromUserClass = profileUserInfo.getUserInfo();

  const infoForPopupClass = {
    title: infoFromUserClass.name,
    description: infoFromUserClass.description,
  };

  profileEditPopup.setInputValues(infoForPopupClass);
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

//profile picture modal
profileImage.addEventListener("click", () => {
  profilePicturePopup.open();
});

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

//have initialCards render and fetch userInfo from API, to set it in the profile
Promise.all([initializeCards(), setUserInfoFromApi()])
  .then(() => {
    //create initial tooltips on page load
    cardTooltipHandler.handleTooltip();
    profileTitleTooltipHandler.handleTooltip();
    profileDescriptionTooltipHandler.handleTooltip();
    //enable form validation
    enableValidationOnAllForms(configObject);
  })
  .catch((err) => {
    console.log(err);
  });
