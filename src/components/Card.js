export default class Card {
  constructor(data, cardSelector, handleImageClick, handleTrashButtonClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._template = document.querySelector(this._cardSelector).content;
    this._cardTemplate = this._template.querySelector(".card");
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
  }

  //like-button functionality
  _addLikeFunctionality() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });
  }

  //click button to delete element
  _addDeleteFunctionality(button, element) {
    if (this.id) {
      //(handleTrashButtonClick) cardDeletePopup.open(); open a popup.
      this._handleTrashButtonClick(this.id);
      //(popupWithForm)(submit handler function)when popup is clicked 'yes':
      //(popupWithForm)start 'saving' animation
      //(handleTrashButtonClick) siteApi.deleteCard(); send a delete request to API
      //(handleTrashButtonClick) wait for delete request to complete
      //(handleTrashButtonClick) card.delete(); delete card html
      //(popupWithForm)close popup
      //(popupWithForm)end saving animation
    }
    button.addEventListener("click", () => {
      element.remove();
    });
  }

  deleteCard() {
    if (this._errorCard) {
      this._errorCard.remove();
    }
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._addLikeFunctionality();
    //this._addDeleteFunctionality(this._deleteButton, this._cardElement);
    this._deleteButton.addEventListener("click", () => {
      this._handleTrashButtonClick(this);
    });
    this._cardElementImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  //replaces card with error-card
  _replaceWithErrorCard() {
    this._errorMessage = "Image has failed to load";
    this._errorCardTemplate = document.querySelector(
      "#error-card-template"
    ).content.firstElementChild;
    this._errorCard = this._errorCardTemplate.cloneNode(true);
    this._errorCardMessage = this._errorCard.querySelector(
      ".card__error-message"
    );
    this._errorDeleteButton = this._errorCard.querySelector(
      ".card__delete-button"
    );
    this._errorCardTitle = this._errorCard.querySelector(".card__title");
    this._errorCardMessage.textContent = this._errorMessage;
    this._errorCardTitle.textContent = this._cardElement.innerText
      ? this._cardElement.textContent
      : "...";
    //this._addDeleteFunctionality(this._errorDeleteButton, this._errorCard);
    this._errorDeleteButton.addEventListener("click", () => {
      this._handleTrashButtonClick(this);
    });
    this._cardElement.replaceWith(this._errorCard);
  }

  //create card, give it its name and image
  getCardElement() {
    this._cardElementTitle = this._cardElement.querySelector(".card__title");
    this._cardElementImage = this._cardElement.querySelector(".card__image");
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.setAttribute("src", `${this._link}`);
    this._cardElementImage.setAttribute("alt", `${this._name}`);

    //add like, delete and picture-modal functionality
    this._setEventListeners();

    //use error-card if the image fails to load
    this._cardElementImage.onerror = () => this._replaceWithErrorCard();

    return this._cardElement;
  }
}
