import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState, useEffect, useCallback } from "react";
import mainApi from "../../utils/MainApi";
import SendContext from "../../contexts/SendContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ErrorContext from "../../contexts/ErrorContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Movies/Preloader/Preloader";
import ProtectedProfile from "../ProtectedRoute/ProtectedProfile";
import ProtectedMovies from "../ProtectedRoute/ProtectedMovies";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([
        mainApi.getUserData(localStorage.jwt),
        mainApi.getMovies(localStorage.jwt),
      ])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse());
          setCurrentUser(userData);
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`);
          setIsCheckToken(false);
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  const setSuccess = useCallback(() => {
    setIsSuccess(false);
  }, []);

  function handleRegister(username, email, password) {
    setIsSend(true);
    mainApi
      .registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          mainApi
            .authorization(email, password)
            .then((res) => {
              localStorage.setItem("jwt", res.token);
              setLoggedIn(true);
              navigate("/movies");
            })
            .catch((err) => {
              setIsError(true);
              console.error(`Ошибка при авторизации после регистрации ${err}`);
            })
            .finally(() => setIsSend(false));
        }
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при регистрации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function handleLogin(email, password) {
    setIsSend(true);
    mainApi
      .authorization(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при авторизации ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function logOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  function editUserData(username, email) {
    setIsSend(true);
    mainApi
      .setUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccess(true);
        setIsEdit(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(`Ошибка при редактировании данных пользователя ${err}`);
      })
      .finally(() => setIsSend(false));
  }

  function handleDeleteMovie(deletemovieId) {
    mainApi
      .deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== deletemovieId;
          })
        );
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`));
  }

  function handleToggelMovie(data) {
    const isAdd = savedMovies.some((element) => data.id === element.movieId);
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id;
    });
    if (isAdd) {
      handleDeleteMovie(seachClickMovie[0]._id);
    } else {
      mainApi
        .addMovie(data, localStorage.jwt)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }

  return (
    <div className="App">
      {isCheckToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>
                <Route
                  path="/signin"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signin"
                        onLogin={handleLogin}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/signup"
                  element={
                    loggedIn ? (
                      <Navigate to="/movies" replace />
                    ) : (
                      <Main
                        name="signup"
                        onRegister={handleRegister}
                        setIsError={setIsError}
                      />
                    )
                  }
                />

                <Route
                  path="/"
                  element={
                    <>
                      <Header name="home" loggedIn={loggedIn} />
                      <Main name="home" />
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={ProtectedProfile}
                      name="profile"
                      loggedIn={loggedIn}
                      logOut={logOut}
                      setIsError={setIsError}
                      isSuccess={isSuccess}
                      setSuccess={setSuccess}
                      editUserData={editUserData}
                      setIsEdit={setIsEdit}
                      isEdit={isEdit}
                    />
                  }
                />

                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedMovies}
                      name="movies"
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                      savedMovies={savedMovies}
                      addMovie={handleToggelMovie}
                    />
                  }
                />

                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={ProtectedMovies}
                      name="savedmovies"
                      loggedIn={loggedIn}
                      setIsError={setIsError}
                      onDelete={handleDeleteMovie}
                      savedMovies={savedMovies}
                    />
                  }
                />

                <Route
                  path="*"
                  element={
                    <>
                      <Main name="error" />
                    </>
                  }
                />
              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}