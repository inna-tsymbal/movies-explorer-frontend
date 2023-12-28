import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function Movies ({
  openNav,
  submitHandler,
  isLoading,
  searchError,
  movies,
  moviesError,
  loggedIn,
  saveMovie,
  savedMovies,
  activeCheckbox,
  toggleCheckbox,
  showMoreCards,
  isHiddenMoreButton,
}) {
  return (
    <>
      <Header openNav={openNav} loggedIn={loggedIn} />
      <main className='movies'>
      <SearchForm 
      submitHandler={submitHandler}
      searchError={searchError}
      activeCheckbox={activeCheckbox}
      toggleCheckbox={toggleCheckbox}
      />
      {isLoading && <Preloader />}
      <div className='movies__container'>
          <p className='movies__text'>{moviesError}</p>
      </div>
      <MoviesCardList 
      movies={movies}
      saveMovie={saveMovie}
      savedMovies={savedMovies}
      showMoreCards={showMoreCards}
      isHiddenMoreButton={isHiddenMoreButton}
      />
      </main>
      <Footer />
    </>
  )
}