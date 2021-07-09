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

  function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function setLocation(lat, lon) {
    database
      .ref(`users/${currentUser.uid}/profile/location`)
      .set({ lat: `${lat}`, lon: `${lon}` });
  }

  function getLocation() {
    database
      .ref(`users/${currentUser.uid}/profile/location`)
      .once("value")
      .then(function (snapshot) {
        getWeatherData(snapshot.val().lat, snapshot.val().lon);
      });
  }

  function setFirstName(firstName) {
    database
      .ref(`users/${currentUser.uid}/profile`)
      .set({ firstName: `${firstName}` });
  }

  function setUserDetails(firstName, lat, lon) {
    database.ref(`users/${currentUser.uid}/profile`).set({
      firstName: `${firstName}`,
      location: { lat: `${lat}`, lon: `${lon}` },
    });
  }

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
