/* eslint-disable no-useless-escape */
export const NAME_REGEX = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const SCREEN_M = 650;
export const SCREEN_L = 1028;

export const registerInputs = [
  { 
    id: 1,
    inputTitle: 'Имя',
    type: 'text',
    inputName: 'name',
    minLength: 2,
    maxLength: 30,
    placeholder: 'Имя',
    pattern: NAME_REGEX.source,
  },
  { 
    id: 2,
    inputTitle: 'E-mail',
    type: 'email',
    inputName: 'email',
    placeholder: 'E-mail',
    pattern: EMAIL_REGEX.source,
  },
  { 
    id: 3,
    inputTitle: 'Пароль',
    type: 'password',
    inputName: 'password',
    placeholder: 'Пароль',
  },
]

export const loginInputs = [
  { 
    id: 1,
    inputTitle: 'E-mail',
    type: 'email',
    inputName: 'email',
    placeholder: 'E-mail',
    pattern: EMAIL_REGEX.source,
  },
  { 
    id: 2,
    inputTitle: 'Пароль',
    type: 'password',
    inputName: 'password',
    placeholder: 'Пароль',
  },
]