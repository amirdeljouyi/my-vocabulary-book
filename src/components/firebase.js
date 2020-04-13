import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAIiowajNH5ET3kZ-oy0k4RHG53j9FYPAY",
    authDomain: "my-vocabulary-book.firebaseapp.com",
    databaseURL: "https://my-vocabulary-book.firebaseio.com",
    projectId: "my-vocabulary-book",
    storageBucket: "my-vocabulary-book.appspot.com",
    messagingSenderId: "277385791137",
    appId: "1:277385791137:web:ba97ae8e5bf3b2f692d2e0",
    measurementId: "G-YQTN258YX5"
  };
firebase.initializeApp(config);
export default firebase;