import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import TooltipHandler from "../components/TooltipHandler.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { initialCards, configObject, apiSettings } from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
//import {zipObject} from "lodash";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector("#profile-add-button");

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
    handleTrashButtonClick
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
  const apiUserInfo = await siteApi.fetchUserInfo();
  profileUserInfo.setUserInfo(
    apiUserInfo.name,
    apiUserInfo.about,
    apiUserInfo.avatar
  );
}

async function updateApiUserInfo() {
  const { name: userName, description: userAbout } =
    profileUserInfo.getUserInfo();
  await siteApi.updateUserInfo(userName, userAbout);
}

async function initializeCards() {
  const initialCards = await siteApi.getInitialCards();
  cardSection = new Section(
    { items: initialCards, renderer: createCard },
    ".cards__list"
  );
  cardSection.renderItems();
}

function handleTrashButtonClick(card) {
  confirmCardDeletePopup.open();
  confirmCardDeletePopup.setSubmitHandler(async () => {
    const res = await siteApi.deleteCard(card.id);
    if (!res.ok) {
      console.log("Could not delete card");
      return;
    }
    card.deleteCard();
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
  updateApiUserInfo();
}

async function handleAddCardSubmit({ title, imageLink }) {
  const cardData = { name: title, link: imageLink };
  const card = await siteApi.addCard(cardData);
  // if (!res.ok) {
  //   console.log("Could not add card");
  //   return;
  // }
  cardSection.addItem(card, "prepend");
  cardTooltipHandler.handleTooltip();
  formValidators["modal-add-card-form"].resetFormValidation(true);
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

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */

//have initialCards render
initializeCards();

//enable form validation
enableValidationOnAllForms(configObject);

//create initial tooltips on page load
cardTooltipHandler.handleTooltip();
profileTitleTooltipHandler.handleTooltip();
profileDescriptionTooltipHandler.handleTooltip();

//fetch userInfo from API, and set it in the profile
setUserInfoFromApi();

//siteApi.addArrayOfCards(initialCards);
//siteApi.getCard("65547f31597573001993451a");

/* -------------------------------------------------------------------------- */
/*                                   Testing                                  */
/* -------------------------------------------------------------------------- */

// fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
//   headers: {
//     authorization: "cb8f3768-1e1a-47c8-a0f6-f4754f9bab87",
//   },
// })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     Promise.reject(res);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("We have an error: ", err);
//   });

// async function fetchUserInfo() {
//   try {
//     const res = await fetch(
//       "https://around-api.en.tripleten-services.com/v1/users/me",
//       {
//         headers: {
//           authorization: "cb8f3768-1e1a-47c8-a0f6-f4754f9bab87",
//         },
//       }
//     );
//     if (!res.ok) {
//       throw res;
//     }
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.log("We have an error from async...await: ", err);
//   }
// }

// fetchUserInfo();
