import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';

export default function Main({
  name,
  onRegister,
  onLogin,
  logOut,
  editUserData,
  setIsError,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit,
  savedMovies,
  onDelete,
  addMovie
}) {

  return (
    <main className="main">
      {
        {
          home: (
            <>
              <Promo />
              <NavTab />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
            </>
          ),
          signin: (
            <Login 
              name={name} 
              onLogin={onLogin} 
              setIsError={setIsError} 
            />
          ),
          signup: (
            <Register
              name={name}
              onRegister={onRegister}
              setIsError={setIsError}
            />
          ),
          error: <NotFound />,
          profile: (
            <Profile
              name={name}
              logOut={logOut}
              editUserData={editUserData}
              setIsError={setIsError}
              isSuccess={isSuccess}
              setSuccess={setSuccess}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          ),
          movies: (
            <>
              <Movies savedMovies={savedMovies} addMovie={addMovie} setIsError={setIsError} />
            </>
          ),
          savedmovies: (
            <>
              <SavedMovies savedMovie={savedMovies} onDelete={onDelete} setIsError={setIsError} />
            </>
          ),
        }[name]
      }
    </main>
  );
}