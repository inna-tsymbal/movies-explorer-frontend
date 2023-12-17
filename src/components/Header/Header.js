import './Header.css';
import logo from '../../images/logo.svg';
import LinkProfile from '../LinkProfile/LinkProfile';
import { Link, NavLink } from 'react-router-dom';

const isLoggedIn = true;

export default function Header ({ isMainPage, isOpen }) {
  return (
    <header className={`header ${isMainPage ? 'header_color_pink' : ''}`}>
      <Link to='/'>
        <img className='logo' src={logo} alt='Логотип'/>
      </Link>
      {isLoggedIn ? (
        <>
          <div className='header__nav-container'>
            <nav className='header__nav'>
              <NavLink className={({isActive}) => `header__link ${isActive ? 'header__link_active' : '' }`} to='/movies'>Фильмы</NavLink>
              <NavLink className={({isActive}) => `header__link ${isActive ? 'header__link_active' : '' }`} to='/saved-movies'>Сохранённые фильмы</NavLink>
            </nav>
            <LinkProfile />
          </div>
          <div className='header__burger-button' onClick={isOpen}></div>
        </>
      ) : (
        <div className='header__auth-container'>
          <nav className='header__auth'>
            <Link to='/signup' className='header__auth-button'>Регистрация</Link>
            <Link to='/signin' className='header__auth-button header__auth-button_enter'>Войти</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
