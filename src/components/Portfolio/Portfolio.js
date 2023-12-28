import './Portfolio.css';

export default function Portfolio () {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list-project'>
        <li className='portfolio__item-project'>
          <a className='portfolio__link-project' href='https://github.com/inna-tsymbal/how-to-learn' target='_blank' rel='noreferrer'>Статичный сайт</a>
        </li>
        <li className='portfolio__item-project'>
          <a className='portfolio__link-project' href='https://github.com/inna-tsymbal/russian-travel' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
        </li>
        <li className='portfolio__item-project'>
          <a className='portfolio__link-project' href='https://github.com/inna-tsymbal/mesto-react' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}