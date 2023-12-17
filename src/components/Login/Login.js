import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Login () {
  return (
    <div className='container'>
      <form className='form'>
        <Link to='/'>
          <img className='logo' src={logo} alt='Логотип'/>
        </Link>
        <h1 className='form__title'>Рады видеть!</h1>
        <div className='form__content'>
          <label className='form__input-container'>
            <h4 className='form__input-title'>E-mail</h4>
            <input className='form__input' placeholder='E-mail' required/>
            <span className='form__input-error'></span>
          </label>
          <label className='form__input-container'>
            <h4 className='form__input-title'>Пароль</h4>
            <input className='form__input' placeholder='Пароль' required minlength="8" maxlength="16"/>
            <span className='form__input-error'></span>
          </label>
        </div>
        <button className='form__button' type='submit'>Войти</button>
        <div className='form__link-container'>
          <p className='form__text'>Еще не зарегистрированы?</p>
          <Link to='/signup' className='form__link'>Регистрация</Link>
        </div>
      </form>
    </div>
  )
}
