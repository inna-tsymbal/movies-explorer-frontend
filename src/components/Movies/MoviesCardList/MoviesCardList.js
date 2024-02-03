import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({
  movies,
  addMovie,
  isLoading,
  savedMovies,
  onDelete,
  firstEntrance,
}) {
  const { pathname } = useLocation();
  const [count, setCount] = useState("");
  const fact = movies.slice(0, count);

  function printCards() {
    const counter = { init: 12, step: 3 };
    if (window.innerWidth < 1440) {
      counter.init = 12;
      counter.step = 3;
    }
    if (window.innerWidth < 1024) {
      counter.init = 8;
      counter.step = 2;
    }
    if (window.innerWidth < 650) {
      counter.init = 5;
      counter.step = 2;
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === "/movies") {
      setCount(printCards().init);
      function Resize() {
        if (window.innerWidth >= 4) {
          setCount(printCards().init);
        }
        if (window.innerWidth < 4) {
          setCount(printCards().init);
        }
        if (window.innerWidth < 3) {
          setCount(printCards().init);
        }
        if (window.innerWidth < 2) {
          setCount(printCards().init);
        }
      }
      window.addEventListener("resize", Resize);
      return () => window.removeEventListener("resize", Resize);
    }
  }, [pathname, movies]);

  function clickMore() {
    setCount(count + printCards().step);
  }

  return (
    <section className="card-list page__card-list">
      <ul className="card-list__lists">
        {isLoading ? (
          <Preloader />
        ) : pathname === "/movies" && fact.length !== 0 ? (
          fact.map((data) => {
            return (
              <MoviesCard
                key={data.id}
                savedMovies={savedMovies}
                addMovie={addMovie}
                data={data}
              />
            );
          })
        ) : pathname === "/saved-movies" && movies.length !== 0 ? (
          movies.map((data) => {
            return (
              <MoviesCard key={data._id} onDelete={onDelete} data={data} />
            );
          })
        ) : !firstEntrance ? (
          <span className="card-list__search-error">Ничего не найдено</span>
        ) : (
          pathname === "/movies"
        )}
      </ul>
      {pathname === "/movies" && (
        <button
          type="button"
          className={`card-list__more ${
            count >= movies.length && "card-list__more_hidden"
          }`}
          onClick={clickMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}