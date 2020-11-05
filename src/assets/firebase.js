import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC6mp8XA2Y8aJO49EM7e9uxuIw8JaqX4wo",
  authDomain: "coaid-c3ae7.firebaseapp.com",
  databaseURL: "https://coaid-c3ae7.firebaseio.com",
  projectId: "coaid-c3ae7",
  storageBucket: "coaid-c3ae7.appspot.com",
  messagingSenderId: "641457244827",
  appId: "1:641457244827:web:44ea471b04a2e24b73d43e",
};
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
var storage = firebase.storage();
const auth = firebase.auth();
export { firebase, storage, database, auth };
