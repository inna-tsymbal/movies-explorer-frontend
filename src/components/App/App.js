import './App.css';
import React, {useState, useEffect} from 'react'
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ErrorPage from "../ErrorPage/ErrorPage";
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import { WindowSizeProvider } from "../../contexts/WindowSizeContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import {moviesApi} from '../../utils/moviesApi'
import {mainApi} from '../../utils/mainApi'
import {authApi} from '../../utils/authApi'
import {beatfilmMoviesApiURL} from "../../utils/constants";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([]);
  const [serverError, setServerError] = useState('');
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  useEffect(() => {
    const existingToken = localStorage.getItem('token')
    if (existingToken) {
      authApi.checkToken(existingToken)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => {console.log(`Ошибка, ${err}`)})
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserData(), moviesApi.getInitialMovies(), mainApi.getSavedMovies()])
        .then(([userData, movies, savedMovies]) => {
          setCurrentUser(userData)
          setMovies(movies)
          setSavedMovies(savedMovies.filter((movie) => movie.owner === userData._id));
        })
        .catch((err) => {
          console.log(`Ошибка:`, err);
          setServerError(`Ошибка с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз: ${err}`);
        })
    }
  }, [isLoggedIn])

  function handleRegister (formValues) {
    authApi.register(formValues.name, formValues.email, formValues.password)
      .then((res) => {
        handleLogin(formValues.email, formValues.password)
      })
      .catch((err) => {
        console.log(`Ошибка, ${err}`);
        setServerError(`При регистрации произошла ошибка: ${err}`);
      })
  }

  function handleLogin (email, password) {
    authApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          setIsLoggedIn(true)
          navigate('/movies')
        }
      })
      .catch((err) => {
        console.log(`There is an error while logging in, ${err}`);
        setServerError(`При логине произошла ошибка: ${err}`);
      })
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setSavedMovies([])
    setIsDataUpdated(false);
    navigate("/");

  };

  const handleProfileChange = (profileInputsData) => {
    mainApi.sendUserData(
      {
        name: profileInputsData.name,
        email: profileInputsData.email,
      })
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
        setIsDataUpdated(true);
      })
      .catch((err) => {
        console.log("Ошибка:", err);
        setServerError(`При изменении профиля произошла ошибка: ${err}`);
        setIsDataUpdated(false);
      })
  }

  const handleMovieLike = (movie) => {
    const currentMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: beatfilmMoviesApiURL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: beatfilmMoviesApiURL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    const isMovieInSavedMovies = savedMovies.find((savedMovie) => savedMovie.movieId === currentMovie.movieId);
    if (isMovieInSavedMovies) {
      handleDeleteMovie(isMovieInSavedMovies._id);
    } else {
      mainApi.saveMovie(currentMovie)
        .then((savedMovie) => {
          setSavedMovies((movies) => [...movies, savedMovie])
        })
        .catch((err) => {
          console.log("Ошибка:", err);
        });
    }
  };

  const handleDeleteMovie = (movieId) => {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((movies) => movies.filter((movie) => movie._id !== movieId))
      })
      .catch((err) => {console.log("Ошибка:", err) });
  };

  const resetServerErrors = () => {
    setServerError('')
  };

  const shouldShowFooter = () => {
    return !['/profile', '/signup', '/signin'].includes(location.pathname);
  };

  const shouldShowHeader = () => {
    return !['/signup', '/signin'].includes(location.pathname);
  };

  const shouldShowHeaderFooter = () => {
    return location.pathname !== '/error';
  };

  const appClassName = ['App'];
  if (['/profile', '/signup', '/signin'].includes(location.pathname)) {appClassName.push('App_color-white')}

  return (
    <div className={appClassName.join(' ')}>
        <CurrentUserContext.Provider value={ currentUser }>
          <WindowSizeProvider>
            {shouldShowHeaderFooter() && shouldShowHeader() && <Header isLoggedIn={isLoggedIn} />}
            <main className="main">
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/movies" element={
                    <ProtectedRoute
                      element={Movies}
                      movies={movies}
                      savedMovies={savedMovies}
                      onLike={handleMovieLike}
                      serverError={serverError}
                      isLoggedIn={isLoggedIn}
                    />}
                  />
                  <Route path="/saved-movies" element={
                    <ProtectedRoute
                      element={SavedMovies}
                      savedMovies={savedMovies}
                      onDelete={handleDeleteMovie}
                      serverError={serverError}
                      isLoggedIn={isLoggedIn}
                    />}
                  />
                  <Route path="/profile" element={
                    <ProtectedRoute
                      element={Profile}
                      handleLogOut={handleLogout}
                      onUpdateUser={handleProfileChange}
                      serverError={serverError}
                      resetServerErrors={resetServerErrors}
                      isDataUpdated={isDataUpdated}
                      isLoggedIn={isLoggedIn}
                    />}
                  />
                  {!isLoggedIn && (
                    <Route path="/signin" element={<Login onLogin={handleLogin} serverError={serverError}
                          resetServerErrors={resetServerErrors} />} />
                  )}
                  {!isLoggedIn && (
                    <Route path="/signup" element={<Register onRegister={handleRegister} serverError={serverError}
                          resetServerErrors={resetServerErrors} isLoggedIn={isLoggedIn} />} />
                  )}
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="*" element={<Navigate replace to="/error" />} />
                </Routes>
            </main>
            {shouldShowHeaderFooter() && shouldShowFooter() && <Footer />}
          </WindowSizeProvider>
        </CurrentUserContext.Provider>
    </div>
  );
};
