import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Redirect from "../Redirect/Redirect";
import Error from "../Error/Error";
import Dashboard from "../Dashboard/Dashboard";
import NewPartForm from "../NewPartForm/NewPartForm";
import EditSus from "../EditSus/EditSus";
import DeleteSus from "../DeleteSus/DeleteSus";

export default function App() {
  const [userAuthToken, setUserAuthToken] = useState(null);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [userBikes, setUserBikes] = useState(null);
  const [userRides, setUserRides] = useState(null);
  const [userSuspension, setUserSuspension] = useState(null);
  const [selectedSuspension, setSelectedSuspension] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [pagesFetched, setPagesFetched] = useState(1);
  const navigate = useNavigate();

  const addAuthToken = (token) => {
    setUserAuthToken(token);
  };

  const addAccessToken = (token) => {
    setUserAccessToken(token);
  };

  const addUserBikes = (bikes) => {
    setUserBikes(bikes);
  };

  const addUserRides = (rides) => {
    setUserRides(rides);
  };

  const addUserSuspension = (suspension) => {
    setUserSuspension(suspension);
  };

  const changeErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    navigate("/error", { replace: true });
  };

  return (
    <main className="app-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/redirect/*"
          element={
            <Redirect
              addAuthToken={addAuthToken}
              userAuthToken={userAuthToken}
              addAccessToken={addAccessToken}
              userAccessToken={userAccessToken}
              addUserBikes={addUserBikes}
              addUserRides={addUserRides}
              userRides={userRides}
              changeErrorMessage={changeErrorMessage}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userSuspension={userSuspension}
              addUserSuspension={addUserSuspension}
              setSelectedSuspension={setSelectedSuspension}
              userBikes={userBikes}
              addUserBikes={addUserBikes}
            />
          }
        />
        <Route
          path="/dashboard/add-new-part"
          element={
            <NewPartForm
              userAccessToken={userAccessToken}
              addAccessToken={addAccessToken}
              userBikes={userBikes}
              addUserBikes={addUserBikes}
              addUserSuspension={addUserSuspension}
              userSuspension={userSuspension}
              userRides={userRides}
              addUserRides={addUserRides}
              pagesFetched={pagesFetched}
              setPagesFetched={setPagesFetched}
            />
          }
        />
        <Route
          path="/dashboard/edit"
          element={
            <EditSus
              addUserSuspension={addUserSuspension}
              userSuspension={userSuspension}
              setSelectedSuspension={setSelectedSuspension}
              selectedSuspension={selectedSuspension}
              userAccessToken={userAccessToken}
              addAccessToken={addAccessToken}
              userRides={userRides}
              addUserRides={addUserRides}
              pagesFetched={pagesFetched}
              setPagesFetched={setPagesFetched}
              userBikes={userBikes}
              addUserBikes={addUserBikes}
              changeErrorMessage={changeErrorMessage}
            />
          }
        />
        <Route
          path="/dashboard/delete"
          element={
            <DeleteSus
              addUserSuspension={addUserSuspension}
              userSuspension={userSuspension}
              setSelectedSuspension={setSelectedSuspension}
              selectedSuspension={selectedSuspension}
            />
          }
        />
        <Route
          path="/error"
          element={
            <Error
              errorMessage={errorMessage}
              changeErrorMessage={changeErrorMessage}
            />
          }
        />
      </Routes>
    </main>
  );
}
