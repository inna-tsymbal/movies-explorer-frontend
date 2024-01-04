import './MoviesCardList.css';
import { useState, useEffect, useCallback } from "react";
import {useLocation} from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {beatfilmMoviesApiURL} from '../../utils/constants';
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { twoCardsToAdd, threeCardsToAdd, fourCardsToAdd } from '../../utils/constants'
import { sixteenCardsToShow, twelveCardsToShow, eightCardsToShow, fiveCardsToShow } from '../../utils/constants'

export default function MoviesCardList({movies, isLoading, onLike, onDelete, savedMovies, isMoviesFound, serverError}) {
  const location = useLocation();
  const movieImageURL = (movie) => movie.movieId ? movie.image : beatfilmMoviesApiURL + movie.image.url
  const { isDesktop, isTablet, isMiddleSize } = useWindowSize();

  const getVisibleMoviesCount = useCallback(() => {
    if (isDesktop) {
      return sixteenCardsToShow;
    } else if (isMiddleSize) {
      return twelveCardsToShow;
    } else if (isTablet) {
      return eightCardsToShow;
    } else {
      return fiveCardsToShow;
    }
  }, [isDesktop, isTablet, isMiddleSize]);
  const [numberOfMovies, setNumberOfMovies] = useState(getVisibleMoviesCount);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setNumberOfMovies(movies.length);
    } else {
      setNumberOfMovies(getVisibleMoviesCount());
    }
  }, [isDesktop, isTablet, isMiddleSize, getVisibleMoviesCount, movies, location.pathname]);

  const handleShowMore = () => {
    const showAnotherMoviesRow = () => {
      if (isDesktop) {
        return fourCardsToAdd;
      } else if (isMiddleSize) {
        return threeCardsToAdd;
      } else {
        return twoCardsToAdd;
      }
    };
    setNumberOfMovies((prevVisibleMovies) => prevVisibleMovies + showAnotherMoviesRow());
  }

  const generateMoviesList = (numberOfMovies) => {
    const limitedMovies = movies.slice(0, numberOfMovies);
    return limitedMovies.map((movie) => {
      return (
        <MoviesCard currentMovie={movie}
                    name={movie.nameRU}
                    duration={movie.duration}
                    link={movieImageURL(movie)}
                    trailerLink={movie.trailerLink}
                    key={movie.id || movie.movieId}
                    onLike={onLike}
                    onDelete={onDelete}
                    savedMovies={savedMovies}
        />
      );
    });
  };

  return (
    <section className="movies">
      <div className="movies__container">
        <ul className='movies__list'>
          {isLoading
            ? (<Preloader />)
            : (isMoviesFound)
              ? (generateMoviesList(numberOfMovies))
              : (serverError)
                ? (<p className="movies__list-text">{serverError}</p>)
                : (<p className="movies__list-text">По вашему запросу ничего не найдено. Попробуйте еще раз.</p>)}
        </ul>
        <div className='movies__btn-container'>
          {
            numberOfMovies < movies.length && (location.pathname === '/movies') && (
              <button className="movies__btn-add" type='button' onClick={handleShowMore}>
                Ещё
              </button>
            )
          }
        </div>
      </div>
    </section>
  );
};