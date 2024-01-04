import './Header.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({ isLoggedIn }) {
  const location = useLocation();
  const rootPath = "/";

  let headerClassName = "header";
  if (location.pathname === '/profile') {
    headerClassName = "header header_color-white";
  } else if (location.pathname !== '/') {
    headerClassName = "header header_color-almost-white";
  }

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <Link className="header__logo-link" to={rootPath}>
          <img className="header__logo" src={logo} alt="Логотип" />
        </Link>
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
};
