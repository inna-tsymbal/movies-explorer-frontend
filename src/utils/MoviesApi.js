class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

  getInitialMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies/',
  headers: {
    'Content-Type': 'application/json',
  }
})
