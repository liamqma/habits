// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/auth";

import firebaseConfig from "../config.json";

// Initialize Firebas.
firebase.initializeApp(firebaseConfig);

export default firebase;
