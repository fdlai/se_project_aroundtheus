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
    }
  }

  // async getCard(cardId) {
  //   try {
  //     const res = await fetch(`${this._cardsUrl}/${cardId}`, {
  //       headers: this._headers,
  //     });
  //     this._checkResponse(res);
  //     const card = await res.json();
  //     console.log(card);
  //     return card;
  //   } catch (err) {
  //     console.log("Failed to get card: ", err);
  //   }
  // }

  // getInitialCards() {
  //   return fetch(this._baseUrl, {
  //     headers: this._headers,
  //   })
  //     .then((res) => {
  //       this._checkResponse(res);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(`Failed to get user cards: `, err);
  //     });
  // }

  //cardsArray is an array of cardata objects
  async addArrayOfCards(cardsArray) {
    cardsArray.forEach(async (cardData) => {
      this.addCard(cardData);
    });
  }

  //cardData is an object with name and link properties
  async addCard(cardData) {
    const res = await fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    });
    this._checkResponse(res);
    const card = await res.json();
    console.log(card);
    return card;
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
      console.log("Failed to delete card: ", err);
    }
  }

  async likeCard(cardId) {
    const res = await fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    this._checkResponse(res);
    const data = await res.json();
    console.log(data);
    return res;
  }

  async unlikeCard(cardId) {
    const res = await fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    this._checkResponse(res);
    const data = await res.json();
    console.log(data);
    return res;
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
    }
  }

  //Setting a user's info does not really fall within the purview of an API class
  // async setUserInfo() {
  //   const userInfo = await this.fetchUserInfo();
  //   this._handleSetUserInfo(userInfo);
  // }

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
      console.log("Failed to update user info: ", err);
    }
  }

  async changeAvatar(userLink) {
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
  }
}

// {"user":{"name":"Jacques Cousteau","about":"Sailor, researcher","avatar":"https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg","_id":"b5c73fd59c3b2a3d8b73e94e"},"token":"cb8f3768-1e1a-47c8-a0f6-f4754f9bab87"}
//https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg
