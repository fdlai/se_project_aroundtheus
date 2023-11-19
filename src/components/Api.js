export default class Api {
  constructor(apiSettings) {
    this._apiSettings = apiSettings;
    this._headers = apiSettings.headers;
    this._baseUrl = apiSettings.baseUrl;
    this._userInfoUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._avatarUrl = `${this._userInfoUrl}/avatar`;
  }

  _checkResponse(response) {
    if (!response.ok) {
      throw response;
    }
  }

  async getInitialCards() {
    try {
      const res = await fetch(this._cardsUrl, {
        headers: this._headers,
      });
      this._checkResponse(res);
      const cardsArray = await res.json();
      console.log(cardsArray);
      return cardsArray;
    } catch (err) {
      console.log("Failed to get cards: ", err);
      throw new Error(err.status);
    }
  }

  //cardsArray is an array of cardata objects
  async addArrayOfCards(cardsArray) {
    cardsArray.forEach(async (cardData) => {
      this.addCard(cardData);
    });
  }

  //cardData is an object with name and link properties
  async addCard(cardData) {
    try {
      const res = await fetch(this._cardsUrl, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(cardData),
      });
      this._checkResponse(res);
      const card = await res.json();
      console.log(card);
      return card;
    } catch (err) {
      console.error("Error! Could not add a card: ", err, cardData);
      throw new Error(err.status);
    }
  }

  async deleteCard(cardId) {
    try {
      const res = await fetch(`${this._cardsUrl}/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      this._checkResponse(res);
      const data = await res.json();
      console.log(data);
      return res;
    } catch (err) {
      console.log("Failed to delete card: ", err, cardId);
      throw new Error(err.status);
    }
  }

  async likeCard(cardId) {
    try {
      const res = await fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
      this._checkResponse(res);
      const data = await res.json();
      console.log(data);
      return res;
    } catch (err) {
      console.log("Error! Failed to like button: ", err, cardId);
      throw new Error(err.status);
    }
  }

  async unlikeCard(cardId) {
    try {
      const res = await fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
      this._checkResponse(res);
      const data = await res.json();
      console.log(data);
      return res;
    } catch (err) {
      console.log("Error! Failed to unlike button: ", err, cardId);
      throw new Error(err.status);
    }
  }

  async fetchUserInfo() {
    try {
      const res = await fetch(this._userInfoUrl, {
        headers: this._headers,
      });
      this._checkResponse(res);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log("Failed to get user info: ", err);
      throw new Error(err.status);
    }
  }

  async updateUserInfo(userName, userAbout) {
    try {
      const res = await fetch(this._userInfoUrl, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userName,
          about: userAbout,
        }),
      });
      this._checkResponse(res);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log("Failed to update user info: ", err, userName, userAbout);
      throw new Error(err.status);
    }
  }

  async changeAvatar(userLink) {
    try {
      const res = await fetch(this._avatarUrl, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: userLink,
        }),
      });
      this._checkResponse(res);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log("Could not change avatar image: ", err, userLink);
      throw new Error(err.status);
    }
  }
}

/* --------------------------- Original User Info --------------------------- */
// {"user":{"name":"Jacques Cousteau","about":"Sailor, researcher","avatar":"https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg","_id":"b5c73fd59c3b2a3d8b73e94e"},"token":"cb8f3768-1e1a-47c8-a0f6-f4754f9bab87"}
//https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg
