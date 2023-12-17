import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Navigation from '../Navigation/Navigation';


export default function App() {
  const [pageOpened, setPageOpened] = React.useState(false);

  function openPage() {
    setPageOpened(true);
  }

  function closePage() {
    setPageOpened(false)
  }

  return (
    <div className="page">
      <>
      <Routes>
        <Route path='/' element={<Main isOpen={openPage}/>} />
        <Route path='/movies' element={<Movies isOpen={openPage} />} />
        <Route path='/saved-movies' element={<SavedMovies isOpen={openPage} />} />
        <Route path='/profile' element={<Profile isOpen={openPage} />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Navigation isOpen={pageOpened} onClose={closePage} />
      </>
    </div>
  )
}