import React from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function SavedMovies ({
  openNav,
  loggedIn,
  savedMovies,
  deleteMovie,
  submitHandler,
  toggleCheckbox,
  activeCheckbox,
  searchError,
  moviesError,
}) {
  return (
    <>
      <Header openNav={openNav} loggedIn={loggedIn} />
      <SearchForm submitHandler={submitHandler} toggleCheckbox={toggleCheckbox} activeCheckbox={activeCheckbox} searchError={searchError} />
      <div className='movies__container'>
        <p className='movies__text'>{moviesError}</p>
      </div>
      <MoviesCardList movies={savedMovies} savedMovies={savedMovies} deleteMovie={deleteMovie} />
      <Footer />
    </>
  )
}