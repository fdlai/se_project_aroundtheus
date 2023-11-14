//a class that handles 3 elements. One that represents a name, one that represents a description, and one that represents a user image
export default class UserInfo {
  constructor(nameSelector, descriptionSelector, imageSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._imageElement = document.querySelector(imageSelector);
  }

  //return an object with user's info
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      description: this._descriptionElement.textContent.trim(),
      imageLink: this._imageElement.src,
    };
  }
  //set the 2 element's textContent to passed-in arguments, and the url for the image
  setUserInfo(userName, userDescription, userImageUrl = null) {
    this._nameElement.textContent = userName;
    this._descriptionElement.textContent = userDescription;
    if (userImageUrl) {
      this._imageElement.src = userImageUrl;
    }
  }
}
