import "./Footer.css";
import { Link } from 'react-router-dom';

export default function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__date'>&#169; {new Date().getFullYear()}</p>
        <div className='footer__links'>
          <Link className='footer__link' to={'https://practicum.yandex.ru'} target='_blank' rel='noreferrer'>Яндекс.Практикум</Link>
          <Link className='footer__link' to={'https://github.com/inna-tsymbal'} target='_blank' rel='noreferrer'>Github</Link>
        </div>
      </div>
    </footer>
  )
}