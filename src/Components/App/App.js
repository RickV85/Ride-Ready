import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';
import Error from '../Error/Error';


function App() {
  return (
    <main className='app-background'>
    <Routes >
      <Route path='/' element={ <Home /> } />
      <Route path='/redirect/*' element={ <Redirect /> } />
      <Route path='/error' element={ <Error /> } />
    </Routes>
    </main>
  );
}

export default App;
