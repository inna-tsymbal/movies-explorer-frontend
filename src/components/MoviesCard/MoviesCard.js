import './MoviesCard.css';


export default function MoviesCard ({
  movie,
  savedMovies,
  saveMovie,
  deleteMovie,
  locationOfSavedMovies,
  ...props
}) {

  const isSavedMovie =  Array.from(savedMovies).some(movie => movie.movieId === props.id);

  function correctionDuration(duration) {
    const hours = Math.floor(duration / 60);
    const readyHours = hours === 0 ? '' : hours + 'ч';
    const minutes = duration % 60;
    return `${readyHours} ${minutes}м`;
  } 

  let dataMovie = {}

  if(locationOfSavedMovies) {
    dataMovie = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: props.image,
      trailerLink: props.trailerLink,
      thumbnail: props.thumbnail,
      movieId: props.movieId,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
      _id: props._id,
    };
  } else {
    dataMovie = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: `https://api.nomoreparties.co/${props.image.url}`,
      trailerLink: props.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${props.image.formats.thumbnail.url}`,
      movieId: props.id,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
    };
  }

  function handleSave() {
    if (locationOfSavedMovies) {
      deleteMovie(dataMovie)
    } else {
      saveMovie(dataMovie);
    }
  }

  return (
    <section className='movies-card'>
      <div className='movies-card__image-container'>
      <a className='movie-card__link' href={dataMovie.trailerLink} target='_blank' rel='noreferrer'>
          <img className='movie-card__image' src={dataMovie.image} alt={dataMovie.nameRU}/>
        </a>
        <button className={`movie-card__save-button ${isSavedMovie ? 'movie-card__save-button_type_saved' : ''} ${locationOfSavedMovies ? 'movie-card__save-button_type_delete' : ''}`} type='submit' onClick={handleSave}>{!isSavedMovie && !locationOfSavedMovies && 'Сохранить'}</button>
      </div>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>{dataMovie.nameRU}</h2>
        <article className='movies-card__time'>{correctionDuration(dataMovie.duration)}</article>
      </div>
    </section>
  )
}