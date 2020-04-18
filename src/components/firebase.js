import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAIiowajNH5ET3kZ-oy0k4RHG53j9FYPAY",
  authDomain: "my-vocabulary-book.firebaseapp.com",
  databaseURL: "https://my-vocabulary-book.firebaseio.com",
  projectId: "my-vocabulary-book",
  storageBucket: "my-vocabulary-book.appspot.com",
  messagingSenderId: "277385791137",
  appId: "1:277385791137:web:1bca64b9876b3d3392d2e0",
  measurementId: "G-20H0Y15186"
};

firebase.initializeApp(config);
export default firebase;