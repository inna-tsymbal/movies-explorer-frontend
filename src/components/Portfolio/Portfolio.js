import './Portfolio.css';

export default function Portfolio () {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__site'>
          <a className='portfolio__link' href='https://github.com/inna-tsymbal/how-to-learn'>Статичный сайт</a>
        </li>
        <li className='portfolio__site'>
          <a className='portfolio__link' href='https://github.com/inna-tsymbal/russian-travel'>Адаптивный сайт</a>
        </li>
        <li className='portfolio__site'>
          <a className='portfolio__link' href='https://github.com/inna-tsymbal/mesto-react'>Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}