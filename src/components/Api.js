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
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }

  // async _request(url, methodType, options) {
  //   if (options) {
  //     return await fetch(url, {
  //       method: methodType,
  //       headers: this._headers,
  //       body: JSON.stringify(options),
  //     });
  //   } else {
  //     return await fetch(url, {
  //       method: methodType,
  //       headers: this._headers,
  //     });
  //   }
  // }

  async getInitialCards() {
    const res = await fetch(this._cardsUrl, {
      headers: this._headers,
    });
    const cardsArray = await this._checkResponse(res);
    console.log(cardsArray);
    return cardsArray;
  }

  //cardData is an object with name and link properties
  async addCard(cardData) {
    const res = await fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    });
    const card = await this._checkResponse(res);
    console.log(card);
    return card;
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    const data = await this._checkResponse(res);
    console.log(data);
    return res;
  }

  async likeCard(cardId) {
    const res = await fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    const data = await this._checkResponse(res);
    console.log(data);
    return res;
  }

  async unlikeCard(cardId) {
    const res = await fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    const data = await this._checkResponse(res);
    console.log(data);
    return res;
  }

  async fetchUserInfo() {
    const res = await fetch(this._userInfoUrl, {
      headers: this._headers,
    });
    const data = await this._checkResponse(res);
    console.log(data);
    return data;
  }

  async updateUserInfo(userName, userAbout) {
    const res = await fetch(this._userInfoUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    });
    const data = await this._checkResponse(res);
    console.log(data);
    return data;
  }

  async changeAvatar(userLink) {
    const res = await fetch(this._avatarUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userLink,
      }),
    });
    const data = await this._checkResponse(res);
    console.log(data);
    return data;
  }
}

/* --------------------------- Original User Info --------------------------- */
// {"user":{"name":"Jacques Cousteau","about":"Sailor, researcher","avatar":"https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg","_id":"b5c73fd59c3b2a3d8b73e94e"},"token":"cb8f3768-1e1a-47c8-a0f6-f4754f9bab87"}
//https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg
