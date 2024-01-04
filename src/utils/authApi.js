class AuthApi {
  constructor(authURL) {
    this._url = authURL
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name, email, password})
    })
      .then(this._checkResponse)
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  }

  checkToken(token){
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: 'GET'
    })
    .then(this._checkResponse)
  }
}

export const authApi = new AuthApi('https://api.diplom.innatsymbal.nomoredomainsmonster.ru')
