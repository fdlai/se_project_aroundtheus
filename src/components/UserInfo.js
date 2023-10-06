export default class UserInfo {
  static profileTitle = document.querySelector("#profile-title");
  static profileDescription = document.querySelector("#profile-description");

  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.value,
      description: this._descriptionElement.value,
    };
  }

  setUserInfo() {
    const { name, description } = this.getUserInfo();
    profileTitle.textContent = name;
    profileDescription.textContent = description;
  }
}
