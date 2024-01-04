/* eslint-disable react-hooks/exhaustive-deps */
import './Profile.css';
import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useCustomFormValidation from '../../utils/useCustomFormValidation';
import { EMAIL_REGEX } from '../../utils/constants'

export default function Profile({ handleLogOut, onUpdateUser, serverError, resetServerErrors, isDataUpdated }) {
  const currentUser = useContext(CurrentUserContext)
  const [showBtnSave, setShowBtnSave] = useState(false);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    formValues,
    setFormValues,
    handleFormChange,
    formErrors,
    isFormValid,
    setIsFormValid
  } = useCustomFormValidation();

  useEffect(() => {
    resetServerErrors();
  }, [])

  useEffect(() => {
    if (currentUser) {
      setFormValues(currentUser);
      setIsFormValid(true);
    }
  }, [currentUser, setIsFormValid, setFormValues]);

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({ name: formValues.name, email: formValues.email });
    setShowBtnSave(false)
  }

  useEffect(() => {
    const hasChanges = formValues.name !== currentUser.name || formValues.email !== currentUser.email;
    hasChanges ? setIsInputChanged(true) :  setIsInputChanged(false);
  }, [formValues, currentUser]);

  useEffect(() => {
    if (isDataUpdated) {
      setShowBtnSave(false);
      setShowConfirmation(true);
    }
  }, [isDataUpdated, serverError, onUpdateUser]);

  const handleBtnEditClick = (e) => {
    e.preventDefault();
    setShowBtnSave(true);
    setShowConfirmation(false);
    resetServerErrors();
  };

  return (
    <section className="profile">
      <div className="profile__container" >
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" name="profile" onSubmit={handleSubmit} >
          <label className="profile__label">Имя
            <input className="profile__input" value={formValues.name || ''} placeholder="Имя" name="name" type="text"
                   minLength={2} maxLength={30} required onChange={handleFormChange} disabled={!showBtnSave}/>
          </label>
          <span className="profile__input-error">{formErrors.name}</span>
          <label className="profile__label">E-mail
            <input className="profile__input" value={formValues.email || ''} placeholder="Email" name="email"
                   type="email" required onChange={handleFormChange} disabled={!showBtnSave}
                   pattern={EMAIL_REGEX}
            />
          </label>
          <span className="profile__input-error">{formErrors.email}</span>

          <span className={`profile__global-error ${showConfirmation ? 'profile__confirmation' : ''}`}>
            {showConfirmation ? 'Данные успешно изменены' : formErrors.global || serverError}
          </span>

          {showBtnSave && (
            <>
              <button className="profile__btn profile__btn_save" type="submit"
                      disabled={!isFormValid || !isInputChanged}>
                Сохранить
              </button>
              <button className="profile__btn profile__btn_exit" type="button" onClick={handleLogOut}>
                Выйти из аккаунта
              </button>
            </>
          )}

          {!showBtnSave && (
            <>
              <button className="profile__btn" type="button" onClick={handleBtnEditClick}>
                Редактировать
              </button>
              <button className="profile__btn profile__btn_exit" type="button" onClick={handleLogOut}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
