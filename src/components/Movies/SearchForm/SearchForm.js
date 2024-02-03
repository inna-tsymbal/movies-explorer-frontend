import { React, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidation from "../../../hooks/useFormValidation";
import ErrorContext from "../../../contexts/ErrorContext";

export default function SearchForm({
  isCheck,
  changeShort,
  searchedMovie,
  searchMovies,
  setIsError,
  savedMovie
}) {
  const { pathname } = useLocation();
  const isError = useContext(ErrorContext)
  const { values, handleChange, reset } = useFormValidation();

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovie.length === 0) {
      reset({ search: "" });
    } else {
      reset({ search: searchedMovie });
    }
    setIsError(false);
  }, [searchedMovie, reset, setIsError, pathname, savedMovie]);

  function onSubmit(evt) {
    evt.preventDefault();
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }
  return (
    <form
      className="search-form"
      name={"SearchForm"}
      onSubmit={onSubmit}
      noValidate
    >
      <input
        required
        className="search-form__input"
        type="text"
        placeholder="Фильм"
        name="search"
        value={values.search || ""}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
        disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
      />
      <span className={`search-form__error ${isError && 'search-form__error_active'}`}>{'Введите ключевое слово'}</span>
      <button type="submit" className={`search-form__button ${savedMovie ? (pathname === '/saved-movies' && savedMovie.length === 0) && 'search-form__button_disabled' : ''}`}>
        Найти
      </button>
      <hr className="search-form__line" />
      <FilterCheckbox isCheck={isCheck} changeShort={changeShort} />
    </form>
  );
}