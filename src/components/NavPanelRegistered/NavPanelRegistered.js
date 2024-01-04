import './NavPanelRegistered.css';
import React from "react";
import {NavLink, Link } from "react-router-dom";

export default function NavPanelRegistered({isDesktop}) {
  return (
    <nav className="nav">
      <ul className="nav__links-list" aria-label="Ссылки на страницы">
        <li>
          <NavLink className={({ isActive }) => `nav__link nav__link-main ${isActive && !isDesktop && 'nav__link_active'}`} to="/">
            Главная
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav__link ${isActive && !isDesktop && 'nav__link_active'}`} to="/movies">
            Фильмы
          </NavLink>
        </li>

        <li>
          <NavLink className={({ isActive }) => `nav__link ${isActive && !isDesktop && 'nav__link_active'}`} to="/saved-movies">
            Сохранённые фильмы
          </NavLink>
        </li>
          <Link className="link-profile" to="/profile">
            <span className='link-profile__text'>Аккаунт</span>
            <div className='link-profile__icon'></div>
          </Link>
      </ul>
    </nav>
  );
};
