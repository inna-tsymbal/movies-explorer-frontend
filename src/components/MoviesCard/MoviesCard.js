import './MoviesCard.css';
import movie from '../../images/movie.png'

export default function MoviesCard ({alt}) {
  return (
    <section className='movies-card'>
      <div className='movies-card__image-container'>
        <img className='movies-card__image' src={movie} alt={alt}/>
        <button className='movies-card__save-button'>Сохранить</button>
      </div>
      <div className='movies-card__info'>
        <h3 className='movies-card__title'>33 слова о дизайне</h3>
        <article className='movies-card__time'>1ч 17м</article>
      </div>
    </section>
  )
}