import './AboutMe.css';
import { Link } from 'react-router-dom';
import photo from '../../../images/photo.png'

export default function AboutMe () {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
        <h3 className='about-me__name'>Виталий</h3>
        <p className='about-me__profession'>Фронтенд-разработчик, 30 лет</p>
        <p className='about-me__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <Link className='about-me__link' href='https://github.com/inna-tsymbal' target='_blank' rel='noreferrer'>Github</Link>
        </div>
        <img className='about-me__photo' src={photo} alt='Фотография студента'/>
      </div>
    </section>
  )
}