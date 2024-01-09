import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function Movies ({isOpen}) {
  return (
    <>
      <Header isOpen={isOpen} />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <Footer />
    </>
  )
}