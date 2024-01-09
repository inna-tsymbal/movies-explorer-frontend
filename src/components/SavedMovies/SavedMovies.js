/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from "react";
import { shortMovieDuration } from '../../utils/constants'

export default function SavedMovies({ savedMovies, onDelete, serverError }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState({});
  const [isMoviesFound, setIsMoviesFound] = useState(true);

  const findMovies = (queryObject) => {
    setIsLoading(true);
    localStorage.setItem('searchQueryForSavedMoviesPage', JSON.stringify(queryObject));
    let filteredQuery = savedMovies;
    if (queryObject.searchString) {
      const searchStringLower = queryObject.searchString.toLowerCase();
      filteredQuery = savedMovies.filter((movie) => {
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
    localStorage.setItem('searchQueryForSavedMoviesPageFiltered', JSON.stringify(filteredQuery));
    setIsLoading(false);
  };

  useEffect(() => {
    const searchedMovies = localStorage.getItem('searchQueryForSavedMoviesPageFiltered');
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    } else {
      setFilteredMovies(savedMovies);
    }

  }, [savedMovies]);

  useEffect(() => {
    findMovies(searchString);
  }, [onDelete, searchString]);

  return (
    <>
      <SearchForm searchQuery={searchString} onFilter={findMovies} />
      <MoviesCardList isLoading={isLoading} movies={filteredMovies} onDelete={onDelete} isMoviesFound={isMoviesFound} serverError={serverError}/>
    </>
  );
};