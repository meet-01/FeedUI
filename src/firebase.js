import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDNk3gYHB-_HNyOG23qPvQjT2wqYL4WzWM",
  authDomain: "facebook-ui-4deee.firebaseapp.com",
  projectId: "facebook-ui-4deee",
  storageBucket: "facebook-ui-4deee.appspot.com",
  messagingSenderId: "601703728491",
  appId: "1:601703728491:web:f2d48b37c81198f079782e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
