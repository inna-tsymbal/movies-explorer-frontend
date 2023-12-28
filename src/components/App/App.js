/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { getContent, login, register, signOut } from '../../utils/Auth';

export default function App() {

  const [isNavOpened, setIsNavOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState('');
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesError, setMoviesError] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [resultMovies, setResultMovies] = React.useState([]);
  const [isTokenChecking, setIsTokenCheking] = React.useState(true);
  const [moviesFilteredName, setMoviesFilteredName] = React.useState([]);
  const checkboxFromLocalStorage = JSON.parse(localStorage.getItem('checkbox')) === null ? false : JSON.parse(localStorage.getItem('checkbox'));
  const [activeCheckbox, setActiveCheckbox] = React.useState(checkboxFromLocalStorage);
  const navigate = useNavigate();
  const location = useLocation();
  const locationSavedMovies = location.pathname === '/saved-movies';

  React.useEffect(() => {
    tokenCheck();
  }, [navigate]);

const tokenCheck = () => {
  const path = location.pathname
  setIsTokenCheking(true);
  getContent().then((res) => {
    const userData = {
      name: res.data.name,
      email: res.data.email
    };
    setUserData(userData);
    setCurrentUser(userData)
    setLoggedIn(true);
    navigate(path, {replace: true});
  })
    .catch((err) => {
      console.log(err);
      setLoggedIn(false);
    })
    .finally(() => {
      setIsTokenCheking(false);
    })
}
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem('movies'));

    React.useEffect(() => {
      if (moviesFromLocalStorage) {
        setActiveCheckbox(checkboxFromLocalStorage);
        setMoviesFilteredName(moviesFromLocalStorage);
      }
    }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUser()
        .then((res) => {
          setCurrentUser({
            name: res.data.name,
            email: res.data.email
          });
          console.log(res)
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn])


  const registration = (name, email, password) => {
    return register(name, email, password)
      .then((res) => {
        if (res) {
          authentication(email, password)
        }
        setCurrentUser({name, email})
      })
      .catch(err => console.log(err));
  }

  const  authentication = (email, password) => {
    return login (email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/movies', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  function handleLogout() {
    signOut()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        setSearchError('');
        setAllMovies([]);
        setMoviesError('');
        setSavedMovies([]);
        setResultMovies([]);
        localStorage.clear();
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
  }

  function updateProfile(name, email) {
    return mainApi.updateUser({ name, email })
      .then(user => setCurrentUser(user))
  }

  function openNav() {
    setIsNavOpened(true);
  }

   function closeNav() {
    setIsNavOpened(false)
  }

  function filterNameMovie(movies, keyWord) {
    const moviesFilteredName = movies.filter((movie) => movie.nameRU.toLowerCase().includes(keyWord.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyWord.toLowerCase()));
    return moviesFilteredName;
  };

  function filterDurationMovie(movies) {
    const moviesFilteredDuration = movies.filter((movie) => movie.duration <= 40);
    return moviesFilteredDuration;
  };

  function toggleCheckbox() {
    setActiveCheckbox(checked => !checked);
    localStorage.setItem('checkbox', !activeCheckbox);
  }

  async function handleSearchSubmit(inputValue) {
    const allMoviesFromLS = JSON.parse(localStorage.getItem('allMovies'));
    if (!allMoviesFromLS) {
      setSearchError('');
      setIsLoading(true);
      let movies = [];
      try {
        if (!inputValue) {
          return setSearchError('Нужно ввести ключевое слово');
        }
        movies = await moviesApi.getMovies()
        if (movies.length === 0) {
          return setMoviesError('Ничего не найдено');
        }
        localStorage.setItem('allMovies', JSON.stringify(movies));
        setAllMovies(movies);
        setMoviesFilteredName(filterNameMovie(movies, inputValue));
        setResultMovies(moviesFilteredName)
      } catch(err) {
        setMoviesError(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setMoviesFilteredName(filterNameMovie(allMoviesFromLS, inputValue));
      setResultMovies(moviesFilteredName)
    }
  };

  React.useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(moviesFilteredName))
  }, [moviesFilteredName])

  React.useEffect(() => {
    if (activeCheckbox) {
      setResultMovies(filterDurationMovie(moviesFilteredName));
    } else {
      setResultMovies(moviesFilteredName);
    }
    console.log({'resultMovies': resultMovies})
  }, [moviesFilteredName, activeCheckbox])

  React.useEffect(() => {
    resultMovies.length === 0 ? setMoviesError('Ничего не найдено') : setMoviesError('');
  }, [resultMovies, activeCheckbox]);

  const [savedMoviesFilteredName, setSavedMoviesFilteredName] = React.useState([]);
  const [resultSavedMovies, setResultSavedMovies] = React.useState([]);
  const [errorSavedMovies, setErrorSavedMovies] = React.useState('');
  const [activeCheckboxOnSavedMovies, setActiveCheckboxOnSavedMovies] = React.useState(false);
  const [savedMoviesError, setSavedMoviesError] = React.useState('');

  function loadSavedMovies () {
    return mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        setResultSavedMovies(res);
        setSavedMoviesFilteredName(res);
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    loadSavedMovies();
  }, []);

  React.useEffect(() => {
    if (locationSavedMovies) {
      loadSavedMovies()
    }
  }, [locationSavedMovies]);

  function saveMovie(dataMovie) {
    const foundMovie = savedMovies.find((movie) => movie.movieId === dataMovie.movieId);
    if(foundMovie) {
      deleteMovie(foundMovie);
    } else {
      mainApi.createSavedMovie(dataMovie)
        .then((movie) => {
          setSavedMovies([movie, ...savedMovies])
        })
        .catch(err => console.log(err));
    }
  }

  function deleteMovie(dataMovie) {
    mainApi.deleteMovie(dataMovie._id)
      .then((deletedMovie) => {
        console.log(deletedMovie)
        setSavedMovies((movies) => movies.filter(item => item.movieId !== deletedMovie.data.movieId));
        setSavedMoviesFilteredName((movies) => movies.filter(item => item.movieId !== deletedMovie.data.movieId));
        setResultSavedMovies((movies) => movies.filter(item => item.movieId !== deletedMovie.data.movieId));
      })
      .catch(err => console.log(err));
  }

  function handleSearchSubmitSavedMovies(inputValue) {
    setErrorSavedMovies('');
    if (!inputValue) {
      setErrorSavedMovies('Нужно ввести ключевое слово');
    } else {
      setSavedMoviesFilteredName(filterNameMovie(savedMovies, inputValue))
    }
  };

  React.useEffect(() => {
    if (activeCheckboxOnSavedMovies) {
      setResultSavedMovies(filterDurationMovie(savedMoviesFilteredName));
    } else {
      setResultSavedMovies(savedMoviesFilteredName);
    }
  }, [savedMoviesFilteredName, activeCheckboxOnSavedMovies])

  function toggleCheckboxOnSavedMovies () {
    setActiveCheckboxOnSavedMovies(checked => !checked);
  };

  React.useEffect(() => {
    resultSavedMovies.length === 0 ? setSavedMoviesError('Ничего не найдено') : setSavedMoviesError('');
  }, [resultSavedMovies, activeCheckboxOnSavedMovies]);

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
    <div className="page">
    {isTokenChecking ? (
        <Preloader />
      ) : (
      <Routes>
        <Route path='/' element={<Main openNav={openNav} loggedIn={loggedIn}/>} />
        <Route path='/movies' element={
        <ProtectedRoute 
        element={Movies}
        openNav={openNav}
        submitHandler={handleSearchSubmit}
        isLoading={isLoading}
        searchError={searchError}
        movies={resultMovies}
        moviesError={moviesError}
        loggedIn={loggedIn}
        saveMovie={saveMovie}
        savedMovies={savedMovies}
        activeCheckbox={activeCheckbox}
        toggleCheckbox={toggleCheckbox}
        />} 
        />
        <Route path='/saved-movies' element={
        
        <ProtectedRoute
        element={SavedMovies}
        openNav={openNav} 
        loggedIn={loggedIn}
        savedMovies={resultSavedMovies}
        deleteMovie={deleteMovie}
        submitHandler={handleSearchSubmitSavedMovies}
        toggleCheckbox={toggleCheckboxOnSavedMovies}
        activeCheckbox={activeCheckboxOnSavedMovies}
        searchError={errorSavedMovies}
        moviesError={savedMoviesError}
        />} 
        />
        <Route path='/profile' element={
        <ProtectedRoute
        openNav={openNav} 
        element={Profile}
        loggedIn={loggedIn}
        updateProfile={updateProfile}
        handleLogout={handleLogout}
        />}
        />
        <Route path='/signin' element={<Login authentication={authentication} loggedIn={loggedIn} />} />
        <Route path='/signup' element={<Register registration={registration} loggedIn={loggedIn} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      )}
      <Navigation isOpen={isNavOpened} closeNav={closeNav} />
    </div>
    </CurrentUserContext.Provider>
  )
}