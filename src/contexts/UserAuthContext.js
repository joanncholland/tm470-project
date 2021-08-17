import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  // register the user with their email address and password
  function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // log the user in with their email address and password credentials
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // log the user out of their account
  function logout() {
    return auth.signOut();
  }

  // send the user a password reset link to their registere email address
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // change the user's email to the new one they input
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  // change the users password
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // set the user's current longitudinal and latitudinal location in this context's state
  function setLocation(lat, lon) {
    database
      .ref(`users/${currentUser.uid}/profile/location`)
      .set({ lat: `${lat}`, lon: `${lon}` });
  }

  // set the user's first name in this context's state
  function setFirstName(firstName) {
    database
      .ref(`users/${currentUser.uid}/profile`)
      .set({ firstName: `${firstName}` });
  }

  // get the user's location from the database
  function getLocation() {
    database
      .ref(`users/${currentUser.uid}/profile/location`)
      .once("value")
      .then(function (snapshot) {
        getWeatherData(snapshot.val().lat, snapshot.val().lon);
      });
  }

  // push the user's details in the database
  function setUserDetails(firstName, lat, lon) {
    database.ref(`users/${currentUser.uid}/profile`).set({
      firstName: `${firstName}`,
      location: { lat: `${lat}`, lon: `${lon}` },
    });
  }

  // get the weather data from the WeatherAPI based on the user's location
  function getWeatherData(lat, lon) {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${lat},${lon}&days=1`
      )
      .then((res) => {
        setWeatherData(res.data.forecast.forecastday[0]);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    setLocation,
    getLocation,
    setFirstName,
    setUserDetails,
    getWeatherData,
    weatherData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
