import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MoviesCard({ onDelete, addMovie, data, savedMovies }) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  useEffect(() => {
    if (pathname === '/movies')
      setClick(savedMovies.some(element => data.id === element.movieId))
  }, [savedMovies, data.id, setClick, pathname])

  function onClick() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setClick(true)
      addMovie(data)
    } else {
      setClick(false)
      addMovie(data)
    }
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч ${minutes}м`)
  }
  return (
    <li className="card">
      <div className="card__container">
        <Link to={data.trailerLink} target="_blank">
          <img src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt="Карточка фильма" className="card__image" />
        </Link>
        {pathname === "/movies" ? (
          <button
            type="button"
            className={`card__save ${click ? "card__save_active" : ""}`}
            onClick={onClick}
          ></button>
        ) : (
          <button
            type="button"
            className={`card__save card__save_type_delete`}
            onClick={() => onDelete(data._id)}
          ></button>
        )}
        <div className="card__overview">
          <p className="card__subtitle">{data.nameRU}</p>
          <span className="card__duration">{convertTime(data.duration)}</span>
        </div>
      </div>
    </li>
  );
}