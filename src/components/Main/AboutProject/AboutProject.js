import './AboutProject.css';

export default function AboutProject () {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__section">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__transfer">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__section">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__transfer">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__period'>
        <div className='about-project__item about-project__item_black'>
          <article>1 неделя</article>
        </div>
        <div className='about-project__item about-project__item_grey'>
          <article>4 недели</article>
        </div>
        <div className='about-project__item about-project__item_text'>
          <article>Back-end</article>
        </div>
        <div className='about-project__item about-project__item_text'>
          <article>Front-end</article>
        </div>
      </div>
    </section>
  )
}