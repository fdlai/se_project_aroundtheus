//a class that handles 2 elements. One that represents a name, and one that represents a description
export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }
  //return an object with user's info
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      description: this._descriptionElement.textContent.trim(),
    };
  }
  //set the 2 element's textContent to passed-in arguments
  setUserInfo(userName, userDescription) {
    this._nameElement.textContent = userName;
    this._descriptionElement.textContent = userDescription;
  }
}
