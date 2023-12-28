import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

export default function SearchForm ({ submitHandler, searchError, activeCheckbox, toggleCheckbox }) {
  const [inputValue, setInputValue] = React.useState('');
  const searchFromLocalStorage = localStorage.getItem('search') || '';
  const location = useLocation();
  const locationOfMovies = location.pathname === '/movies';

  React.useEffect(() => {
    if (locationOfMovies) {
      setInputValue(searchFromLocalStorage);
    }
  }, [locationOfMovies, searchFromLocalStorage])

  function onChange(e) {
    setInputValue(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    submitHandler(inputValue);
    if (locationOfMovies) {
      localStorage.setItem('search', inputValue);
    } 
  }

  return (
    <section className='search-form'>
      <form className='search-form__container' name='search-form' noValidate onSubmit={onSubmit}>
        <input className='search-form__input' placeholder='Фильм' required type='text' name='search-input' value={inputValue} onChange={onChange}></input>
        <span className='search-form__error'>{searchError}</span>
        <button className='search-form__button' type='submit'>Найти</button>
        <div className='search-form__input-line'></div>
        <FilterCheckbox activeCheckbox={activeCheckbox} toggleCheckbox={toggleCheckbox} />
      </form>
      <div className='search-form__line'></div>
    </section>
  )
}