import './FilterCheckbox.css';

export default function FilterCheckbox ({ activeCheckbox, toggleCheckbox }) {
  return (
    <form className='filter-checkbox'>
      <button className= {`${activeCheckbox ? 'filter-checkbox__button' : 'filter-checkbox__button_inactive'}`} type='button' onClick={toggleCheckbox}></button>
      <article className='filter-checkbox__text'>Короткометражки</article>
    </form>
  )
}