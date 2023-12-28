class MoviesApi {
    constructor(url) {
      this.url = url;
    }
  
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getMovies() {
      return fetch(`${this.url}`)
      .then(this._checkResponse);
    }
   }
  
   export const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');