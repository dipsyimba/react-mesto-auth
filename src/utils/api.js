class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  setUserInfo(name, occupation) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: occupation,
      }),
    }).then((res) => this._getResponse(res));
  }

  setNewCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponse(res));
  }

  setAvatar(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponse(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((response) => this._getResponse(response));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((response) => this._getResponse(response));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then((response) => this._getResponse(response));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/',
  headers: {
    authorization: 'a19e97f8-e3c3-444b-acd8-2259e79e6607',
    'Content-Type': 'application/json',
  },
});

export default api;
