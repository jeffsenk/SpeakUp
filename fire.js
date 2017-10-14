import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyBHqrAO8TWC8JbL6Ytf1_x1pfHxkFba8tw",
    authDomain: "proposal-a2db2.firebaseapp.com",
    databaseURL: "https://proposal-a2db2.firebaseio.com",
    projectId: "proposal-a2db2",
    storageBucket: "proposal-a2db2.appspot.com",
    messagingSenderId: "181971811327"
  };

var fire = firebase.initializeApp(config);
export default fire;
