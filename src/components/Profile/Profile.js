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
        <h3 className='profile__name'>Привет, Виталий!</h3>
        <div className='profile__content'>
          <div className='profile__input-container'>
            <article className='profile__input-title'>Имя</article>
            <input className='profile__input'/>
          </div>
          <div className='profile__input-container'>
            <article className='profile__input-title'>E-mail</article>
            <input className='profile__input'/>
          </div>
        </div>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_red' onClick={toMainPage}>Выйти из аккаунта</button>
      </div>
    </>
  )
}

export default Profile;
