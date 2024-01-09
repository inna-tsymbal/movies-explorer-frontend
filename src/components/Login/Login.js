/* eslint-disable react-hooks/exhaustive-deps */
import './Login.css';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import useCustomFormValidation from '../../utils/useCustomFormValidation';
import {EMAIL_REGEX} from "../../utils/constants";

export default function Login({onLogin, serverError, resetServerErrors}) {
  const {
    formValues,
    handleFormChange,
    formErrors,
    isFormValid,
  } = useCustomFormValidation();

  function handleSubmitButton (e) {
    e.preventDefault()
    onLogin(formValues.email, formValues.password)
  }

  useEffect(() => {
    resetServerErrors();
  }, [formValues])

  return (
    <section className="register">
      <div className="register__container" >
        <Link className="register__logo-link" to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form className="register__form" name="profile" onSubmit={handleSubmitButton}>
          <label className="register__label">E-mail
            <input className="register__input"
                   type="email"
                   value={formValues.email || ''}
                   name="email"
                   placeholder="Email"
                   minLength={6}
                   maxLength={20}
                   required
                   pattern={EMAIL_REGEX}
                   onChange={handleFormChange}/>
          </label>
          <span className="register__input-error">{formErrors.email}</span>
          <label className="register__label">Пароль
            <input className="register__input register__input_password"
                   type="password"
                   value={formValues.password || ''}
                   name="password"
                   placeholder="Пароль"
                   minLength={5}
                   maxLength={20}
                   required
                   onChange={handleFormChange}/>
          </label>
          <span className="register__input-error">{formErrors.password}</span>
          <span className="register__global-error">
            {formErrors.global || serverError}
          </span>
            <button className="register__btn register__btn_save register__btn_login" type="submit"
                    disabled={!isFormValid}>
              Войти
            </button>
            <div className="register__bottom-container">
              <p className="register__bottom-container-text">Еще не зарегистрированы?</p>
              <Link className="register__btn register__btn_link" to="/signup" >
                Регистрация
              </Link>
            </div>
        </form>
      </div>
    </section>
  );
};