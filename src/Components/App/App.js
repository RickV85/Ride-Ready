import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';
import Error from '../Error/Error';
import Dashboard from '../Dashboard/Dashboard'
import NewPartForm from '../NewPartForm/NewPartForm';

function App() {
  const [userBikes, setUserBikes] = useState([]);

  const populateUserBikes = (bikes) => {
    console.log(bikes);
    setUserBikes(bikes);
  }

  return (
    <main className='app-background'>
    <Routes >
      <Route path='/' element={ <Home /> } />
      <Route path='/redirect/*' element={ <Redirect /> } />
      <Route path='/dashboard' element={ <Dashboard populateUserBikes={populateUserBikes} />} />
      <Route path='/dashboard/add-new-part' element={ <NewPartForm bikes={userBikes} />} />
      <Route path='/error' element={ <Error /> } />
    </Routes>
    </main>
  );
}

export default App;
