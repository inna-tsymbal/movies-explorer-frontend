/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useCustomFormValidation from '../../utils/useCustomFormValidation';
import {EMAIL_REGEX} from "../../utils/constants";

export default function Register({ onRegister, serverError, resetServerErrors, isLoggedIn }) {
  const navigate = useNavigate();
  const {
    formValues,
    handleFormChange,
    formErrors,
    isFormValid,
    resetFormState,
  } = useCustomFormValidation();

  const handleSubmitButton = (e) => {
    e.preventDefault();
    onRegister(formValues);
    resetFormState();
  };

  useEffect(() => {
    resetServerErrors();
  }, [formValues])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn]);

  return (
    <section className="register">
      <div className="register__container" >
        <Link className="register__logo-link" to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" name="profile" onSubmit={handleSubmitButton}>
          <label className="register__label">Имя
            <input
              className="register__input"
              placeholder="Ваше имя"
              name="name"
              type="text"
              minLength={2}
              maxLength={30}
              required
              value={formValues.name || ''}
              onChange={handleFormChange}
            />
          </label>
          <span className="register__input-error">
            {formErrors.name}
          </span>
          <label className="register__label">E-mail
            <input
              className="register__input"
              type="email"
              onChange={handleFormChange}
              name="email"
              placeholder="Email"
              minLength={6}
              maxLength={20}
              required
              pattern={EMAIL_REGEX}
              value={formValues.email || ''}
            />
          </label>
          <span className="register__input-error">
            {formErrors.email}
          </span>
          <label className="register__label">Пароль
            <input
              className="register__input register__input_password"
              type="password"
              onChange={handleFormChange}
              name="password"
              placeholder="Пароль"
              minLength={5}
              maxLength={15}
              required
              value={formValues.password || ''}
            />
          </label>
          <span className="register__input-error">
            {formErrors.password}
          </span>

          <span className="register__global-error">
            {formErrors.global || serverError}
          </span>
          <button
            className="register__btn register__btn_save"
            type="submit"
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </button>
          <div className="register__bottom-container">
            <p className="register__bottom-container-text">Уже зарегистрированы?</p>
            <Link className="register__btn register__btn_link" to="/signin">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};