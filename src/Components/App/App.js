import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';
import Error from '../Error/Error';
import Dashboard from '../Dashboard/Dashboard'
import NewPartForm from '../NewPartForm/NewPartForm';

export default function App() {
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [userBikes, setUserBikes] = useState(null);
  const [userRides, setUserRides] = useState(null);
  const [userSuspension, setUserSuspension] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const addAuthToken = (token) => {
    setUserAuthToken(token);
  }

  const addAccessToken = (token) => {
    setUserAccessToken(token);
  }

  const addUserBikes = (bikes) => {
    setUserBikes(bikes);
  }

  const addUserRides = (rides) => {
    setUserRides(rides);
  }

  const addUserSuspension = (suspension) => {
    setUserSuspension(suspension);
  }

  const changeErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
  }

  return (
    <main className='app-background'>
    <Routes >
      <Route path='/' element={ <Home /> } />
      <Route path='/redirect/*' element={ 
        <Redirect 
          addAuthToken={addAuthToken} 
          userAuthToken={userAuthToken} 
          addAccessToken={addAccessToken} 
          userAccessToken={userAccessToken} 
          addUserBikes={addUserBikes} 
          userBikes={userBikes} 
          addUserRides={addUserRides} 
          userRides={userRides} 
          changeErrorMessage={changeErrorMessage}
        />}
      />
      <Route path='/dashboard' element={ 
        <Dashboard 
            // userBikes={userBikes} 
            // userRides={userRides} 
            userSuspension={userSuspension}
          />} 
        />
      <Route path='/dashboard/add-new-part' element={ 
        <NewPartForm 
          userBikes={userBikes} 
          addUserSuspension={addUserSuspension} 
          />} 
        />
      <Route path='/error' element={ 
        <Error 
        errorMessage={errorMessage} 
        changeErrorMessage={changeErrorMessage}
        /> } 
      />
    </Routes>
    </main>
  );
}

// export { App, changeErrorMessage }  ;
