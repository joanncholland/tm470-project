import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderID: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID: process.env.REACT_APP_APP_ID,
  measurementID: process.env.REACT_APP_MEASUREMENT_ID,
});

// set up auth method
export const auth = app.auth();
// set up database method
export const database = app.database();
// set up firestore method
export const convertDateToTimestamp = (date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};

export default app;
