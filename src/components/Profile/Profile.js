import './Profile.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

function Profile ({isOpen}) {
  const navigate = useNavigate();
  function toMainPage() {
    navigate('/', { replace: true });
  }
  
  return (
    <>
      <Header isOpen={isOpen} />
      <div className='profile'>
        <h1 className='profile__name'>Привет, Виталий!</h1>
        <div className='profile__content'>
          <div className='profile__input-container'>
            <article className='profile__input-title'>Имя</article>
            <input className='profile__input' placeholder='Имя' required minlength="2" maxlength="30"/>
          </div>
          <div className='profile__input-container'>
            <article className='profile__input-title'>E-mail</article>
            <input className='profile__input' placeholder='E-mail' required/>
          </div>
        </div>
        <button className='profile__button' type='submit'>Редактировать</button>
        <button className='profile__button profile__button_red' onClick={toMainPage} type='submit'>Выйти из аккаунта</button>
      </div>
    </>
  )
}

export default Profile;
