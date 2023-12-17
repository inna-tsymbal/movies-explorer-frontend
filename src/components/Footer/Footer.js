import './Footer.css'

export default function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__date'>&#169; {new Date().getFullYear()}</p>
        <div className='footer__links'>
          <a className='footer__link' href='https://practicum.yandex.ru'>Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/inna-tsymbal'>Github</a>
        </div>
      </div>
    </footer>
  )
}