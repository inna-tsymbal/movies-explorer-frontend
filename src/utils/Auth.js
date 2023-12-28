const url = "https://api.diplom.innatsymbal.nomoredomainsmonster.ru";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (name, email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
  }).then(checkResponse)
};

export const login = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  }).then(checkResponse)
};

export const getContent = (token) => {
    return fetch(`${url}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(checkResponse);
};
  
export const signOut = () => {
    return fetch(`${url}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkResponse);
};
