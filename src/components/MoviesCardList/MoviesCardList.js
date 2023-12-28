import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { useResize } from '../../utils/useResize';

export default function MoviesCardList ({ movies, saveMovie, savedMovies, deleteMovie }) {
  const location = useLocation();
  const locationOfSavedMovies = location.pathname === '/saved-movies';
  const { isScreenS, isScreenM, isScreenL } = useResize();
  const [amountMovies, setAmountMovies] = React.useState(0);
  const [addedMovies, setAddedMovies] = React.useState(0);
  const moviesError = false

  React.useEffect(() => {
    if (isScreenL) {
      setAmountMovies(12);
      setAddedMovies(3);
    } else if (isScreenM) {
      setAmountMovies(8);
      setAddedMovies(2);
    } else if (isScreenS) {
      setAmountMovies(5);
      setAddedMovies(2);
    }
  }, [isScreenL, isScreenM, isScreenS]);

  // Добавление карточек по клику на Еще
  function showMoreMovies() {
    setAmountMovies(amt => amt + addedMovies)
  };

  const isVisibleButton = movies.length > amountMovies && !locationOfSavedMovies;

  return (
    <section className='movies-card-list'>
      {moviesError ? (
      <div className='movies__container'>
        <p className='movies__text'>{moviesError}</p>
      </div>
      ) : (
      <div className='movies-card-list__container'>
        {movies.map((movieElement, index) => {
            if (index < amountMovies) {
              return(
              <MoviesCard
              key={ locationOfSavedMovies ? movieElement.movieId : movieElement.id}
              {...movieElement}
              movie={movieElement}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              locationOfSavedMovies={locationOfSavedMovies}
              />
              );
            }
            return null;
          })}
      </div>
      )}
      {isVisibleButton && <button className='movies-card-list__button' type='button' onClick={showMoreMovies}>Еще</button>}
    </section>
  )
}
