import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCXnafE81BQUDq1Oko98-YNNwLfBePamGc",
  authDomain: "habits-ba846.firebaseapp.com",
  databaseURL: "https://habits-ba846.firebaseio.com",
  projectId: "habits-ba846",
  storageBucket: "habits-ba846.appspot.com",
  messagingSenderId: "356464881881",
  appId: "1:356464881881:web:1967cef56bab14a2bacec8",
  measurementId: "G-M6XYGNM579"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
