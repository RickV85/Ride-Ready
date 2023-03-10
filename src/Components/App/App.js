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
              setUserAuthToken={setUserAuthToken}
              userAuthToken={userAuthToken}
              setUserAccessToken={setUserAccessToken}
              userAccessToken={userAccessToken}
              setUserBikes={setUserBikes}
              setUserRides={setUserRides}
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
              setUserSuspension={setUserSuspension}
              setSelectedSuspension={setSelectedSuspension}
              userBikes={userBikes}
              setUserBikes={setUserBikes}
            />
          }
        />
        <Route
          path="/dashboard/add-new-part"
          element={
            <NewPartForm
              userAccessToken={userAccessToken}
              setUserAccessToken={setUserAccessToken}
              userBikes={userBikes}
              setUserBikes={setUserBikes}
              setUserSuspension={setUserSuspension}
              userSuspension={userSuspension}
              userRides={userRides}
              setUserRides={setUserRides}
              pagesFetched={pagesFetched}
              setPagesFetched={setPagesFetched}
            />
          }
        />
        <Route
          path="/dashboard/edit"
          element={
            <EditSus
              setUserSuspension={setUserSuspension}
              userSuspension={userSuspension}
              setSelectedSuspension={setSelectedSuspension}
              selectedSuspension={selectedSuspension}
              userAccessToken={userAccessToken}
              setUserAccessToken={setUserAccessToken}
              userRides={userRides}
              setUserRides={setUserRides}
              pagesFetched={pagesFetched}
              setPagesFetched={setPagesFetched}
              userBikes={userBikes}
              setUserBikes={setUserBikes}
              changeErrorMessage={changeErrorMessage}
            />
          }
        />
        <Route
          path="/dashboard/delete"
          element={
            <DeleteSus
              setUserSuspension={setUserSuspension}
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
        <Route
          path="*"
          element={
            <Error/>
          }
        />
      </Routes>
    </main>
  );
}
