class MainApi {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(this._checkResponse)
  }

  sendUserData(profileInputsData) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        name: profileInputsData.name,
        email: profileInputsData.email,
        })
    })
      .then(this._checkResponse)
  }

  saveMovie({ ...data }) {
    return fetch(`${this._url}movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({...data})
    })
      .then(this._checkResponse)
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._url}movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
      .then(this._checkResponse)
  }
}


export const mainApi = new MainApi({
  baseUrl: 'https://api.diplom.innatsymbal.nomoredomainsmonster.ru/',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${ localStorage.getItem('token') }`,
  }
})
