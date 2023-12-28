class MainApi {
    constructor({url}) {
        this._url = url;
    }
    
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }
  
    getSavedMovies(token) {
      return this._request(`${this._url}/movies`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      })
    }
  
    createSavedMovie(dataMovie, token) {
        return this._request(`${this._url}/movies`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(dataMovie),
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            }
        })
    }
  
    deleteMovie(id, token) {
        return this._request(`${this._url}/movies/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            }
        })
    }
  
    getUser(token) {
        return this._request(`${this._url}/users/me`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            }
        })
    }
  
    updateUser(dataUser, token) {
        return this._request(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify(dataUser),
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            }
        })
    }
}
  
  
export const mainApi = new MainApi({
    url:'https://api.diplom.innatsymbal.nomoredomainsmonster.ru',
});
