import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function SavedMovies ({isOpen}) {
  return (
    <>
      <Header isOpen={isOpen} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}