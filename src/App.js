import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Home';
import Redirect from './Redirect';


function App() {
  return (
    <main>
    <Routes >
      <Route path='/' element={ <Home /> } />
      <Route path='/redirect/*' element={ <Redirect /> } />
    </Routes>
    </main>
  );
}

export default App;
