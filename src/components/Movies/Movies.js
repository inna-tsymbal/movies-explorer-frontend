import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { shortMovieDuration } from '../../utils/constants'

export default function Movies({ movies, onLike, savedMovies, serverError }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchString, setSearchString] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMoviesFound, setIsMoviesFound] = useState(true);

  useEffect(() => {
    const savedSearchQuery = JSON.parse(localStorage.getItem('searchQueryForMoviesPage'));
    if (savedSearchQuery) {
      setSearchString(savedSearchQuery);
    }
    const savedFilteredMovies = JSON.parse(localStorage.getItem('searchQueryForMoviesPageFiltered'));
    if (savedFilteredMovies) {
      setFilteredMovies(savedFilteredMovies);
    }
  }, []);

  const findMovies = (queryObject) => {
    setIsLoading(true)
    localStorage.setItem('searchQueryForMoviesPage', JSON.stringify(queryObject));
    let filteredQuery = [];
    if (queryObject.searchString) {
      const searchStringLower = queryObject.searchString.toLowerCase();
      filteredQuery = movies.filter((movie) => {
        const nameRULower = movie.nameRU ? movie.nameRU.toLowerCase() : '';
        const nameENLower = movie.nameEN ? movie.nameEN.toLowerCase() : '';
        return (
          nameRULower.includes(searchStringLower) || nameENLower.includes(searchStringLower)
        );
      });
    }
    if (queryObject.isCheckboxChecked) {
      filteredQuery = filteredQuery.filter((movie) => {
        return movie.duration <= shortMovieDuration;
      });
    }
    setFilteredMovies(filteredQuery);
    filteredQuery.length > 0 ? setIsMoviesFound(true) : setIsMoviesFound(false)
      setIsLoading(false);
    localStorage.setItem('searchQueryForMoviesPageFiltered', JSON.stringify(filteredQuery));
  };

  return (
    <>
      <SearchForm searchQuery={searchString} onFilter={findMovies} />
      <MoviesCardList isLoading={isLoading} movies={filteredMovies} onLike={onLike} savedMovies={savedMovies} isMoviesFound={isMoviesFound} serverError={serverError}/>
    </>
  );
};
