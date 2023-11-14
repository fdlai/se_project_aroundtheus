export default class Api {
  constructor(apiSettings, handleSetUserInfo, handlePatchUserInfo) {
    this._apiSettings = apiSettings;
    this._baseUrl = apiSettings.baseUrl;
    this._userInfoUrl = apiSettings.userInfoUrl;
    this._headers = apiSettings.headers;
    this._handleSetUserInfo = handleSetUserInfo;
    this._handlePatchUserInfo = handlePatchUserInfo;
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  async fetchUserInfo() {
    try {
      const res = await fetch(this._userInfoUrl, {
        headers: this._headers,
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log("Failed to get user info: ", err);
    }
  }

  async setUserInfo() {
    const userInfo = await this.fetchUserInfo();
    this._handleSetUserInfo(userInfo);
  }

  async patchUserInfo() {
    try {
      const { userName, userAbout } = this._handlePatchUserInfo();
      const res = await fetch(this._userInfoUrl, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userName,
          about: userAbout,
        }),
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log("Failed to update user info: ", err);
    }
  }
}

// {"user":{"name":"Jacques Cousteau","about":"Sailor, researcher","avatar":"https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg","_id":"b5c73fd59c3b2a3d8b73e94e"},"token":"cb8f3768-1e1a-47c8-a0f6-f4754f9bab87"}
