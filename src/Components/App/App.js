import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';


function App() {
  return (
    <main className='app-background'>
    <Routes >
      <Route path='/' element={ <Home /> } />
      <Route path='/redirect/*' element={ <Redirect /> } />
    </Routes>
    </main>
  );
}

export default App;
