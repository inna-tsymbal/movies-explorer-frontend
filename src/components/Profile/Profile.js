/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile ({openNav, loggedIn, updateProfile, handleLogout}) {
  const {currentUser, setCurrentUser} = React.useContext(CurrentUserContext);

  const [isSaving, setIsSaving] = React.useState(false);
  
  const [requestMessage, setRequestMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const { name, email } = currentUser;

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const { profileName, profileEmail } = values;
  

  React.useEffect(() => {
    resetForm({profileName: name, profileEmail: email})
  }, [name, email]);


  function handleSubmit(e) {
    e.preventDefault();
    setRequestMessage('');
    setSuccess(false);
    
    console.log(profileName, profileEmail)
    updateProfile(profileName, profileEmail)
      .then((res) => {
        console.log(res)
        setCurrentUser({name: profileName, email: profileEmail})
        setIsSaving(false);
        setSuccess(true);
        setRequestMessage('Аккаунт обновлен');
      })
      .catch((err) => setRequestMessage(err));
    setIsSaving(false);
  }

  function toggleButton() {
    setIsSaving(true)
  }

  function isDisabled() {
    if (name === profileName && email === profileEmail) {
      return true;
    } else {
      return !isValid;
    };
  };

  return (
    <>
      <Header openNav={openNav} loggedIn={loggedIn} />
      <main className='profile'>
        <h1 className='profile__name'>{`Привет, ${currentUser.name}!`}</h1>
        <form className='profile__content' name='profile' onSubmit={handleSubmit}>
          <div className='profile__input-container'>
            <article className='profile__input-title'>Имя</article>
            <input
 className='profile__input'
 type='text'
 name='profileName'
 minLength='2'
 maxLength='30'
 placeholder='Имя'
 value={values['profileName'] || ''}
 pattern={NAME_REGEX.source}
 onChange={handleChange}
 required
            />
            <span className='profile__input-error'>{errors['profileName']}</span>
          </div>
          <div className='profile__input-container'>
            <article className='profile__input-title'>E-mail</article>
            <input
                            className='profile__input'
                            type='email'
                            name='profileEmail'
                            placeholder='E-mail'
                            value={values['profileEmail'] || ''}
                            pattern={EMAIL_REGEX.source}
                            onChange={handleChange}
                            required
              />
              <span className='profile__input-error'>{errors['profileEmail']}</span>
          </div>
        </form>
        <span className={`profile__request-error ${success && 'profile__request-error_no-error'}`}>{requestMessage}</span>
        {!isSaving ? (
        <button className='profile__button-edit' onClick={toggleButton} type='submit'>Редактировать</button>
        ) : (
        <button className='profile__button-save' disabled={isDisabled()} onClick={handleSubmit} type='submit'>Сохранить</button>
        )}
        {!isSaving && (
        <button className='profile__button profile__button-exit' onClick={handleLogout} type='submit'>Выйти из аккаунта</button>
        )}
        </main>
    </>
  )
}

export default Profile;
