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
  
    // Загрузка сохраненных фильмов
    getSavedMovies() {
      return this._request(`${this._url}/movies`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  
    // Сохранение фильма
    createSavedMovie(dataMovie) {
        return this._request(`${this._url}/movies`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(dataMovie),
            headers: {
              'Content-Type': 'application/json',
            }
        })
    }
  
    // Удаление фильма
    deleteMovie(id) {
        return this._request(`${this._url}/movies/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
        })
    }
  
    // Получение информации о себе
    getUser() {
        return this._request(`${this._url}/users/me`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
        })
    }
  
    // Редактирование профиля
    updateUser(dataUser) {
        return this._request(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify(dataUser),
            headers: {
              'Content-Type': 'application/json',
            }
        })
    }
}
  
  
export const mainApi = new MainApi({
    url:'https://api.diplom.innatsymbal.nomoredomainsmonster.ru',
});

// export const mainApi = new MainApi({
//   url: 'http://localhost:3003',
// });