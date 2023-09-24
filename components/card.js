export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _addLikeFunctionality() {
    //like-button functionality
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });
  }

  //click button to delete element
  _addDeleteFunctionality(button, element) {
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  __setEventListeners() {
    this._addLikeFunctionality();
    this._addDeleteFunctionality();
  }

  _getCardElement() {
    //create card, give it its name and image
    this._template = document.querySelector(this._cardSelector).content;
    this._cardTemplate = this._template.querySelector(".card");
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardElementTitle = this._cardElement.querySelector(".card__title");
    this._cardElementImage = this._cardElement.querySelector(".card__image");
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.setAttribute("src", `${this._link}`);
    this._cardElementImage.setAttribute("alt", `${this._name}`);

    //add like and delete functionality
    this.__setEventListeners();

    //picture-modal functionality
    this._handleImageClick(this._cardElementImage, this._data);

    //use error-card if the image fails to load
    this._cardElementImage.onerror = () =>
      this._replaceWithErrorCard("Image has failed to load");
  }

  //replaces card with error-card
  _replaceWithErrorCard(errorMessage = "Error") {
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
    addDeleteFunctionality(this._errorDeleteButton, this._errorCard);
    this._cardElement.replaceWith(this._errorCard);
  }

  //appends or prepends card to wrapper
  renderCard(placement = "append", wrapper) {
    this._getCardElement();
    switch (placement) {
      case "append":
        wrapper.append(this._cardElement);
        break;
      case "prepend":
        wrapper.prepend(this._cardElement);
        break;
      default:
        console.log("Error. Please use only 'append' or 'prepend'.");
    }
  }
}
