import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import {convertor} from "../../utils/convertor";

export default function MoviesCard({name, duration, link, trailerLink, onLike, onDelete, currentMovie, savedMovies}) {
  const location = useLocation();
  const isLiked = savedMovies ? savedMovies.find((item) => item.movieId === currentMovie.id) : false;

  return (
  <div className='movie-card'>
    <div className='movie-card__image-container'>
      <a className='movie-card__link' href={trailerLink} target='_blank' rel='noreferrer'>
        <img className='movie-card__image' src={link} alt={name}/>
        </a>
          {location.pathname === '/saved-movies' && (
          <button className="movie-card__save-button_type_delete" type="button"
          onClick={() => onDelete(currentMovie._id)}/>
          )}
          {location.pathname === '/movies' && (
          <button className={`movie-card__save-button ${ isLiked ? 'movie-card__save-button_type_saved' : '' }` } type="button"
          onClick={() => onLike(currentMovie)}>{ !isLiked && "Сохранить"}</button>
          )}
        </div>
        <div className='movie-card__info'>
          <h3 className='movie-card__title'>{name}</h3>
          <article className='movie-card__duration'>{convertor(duration)}</article>
          </div>
          </div>
          )
};
