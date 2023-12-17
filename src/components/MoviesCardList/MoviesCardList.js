import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList () {
  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </div>
      <button className='movies-card-list__button'>Еще</button>
    </section>
  )
}
