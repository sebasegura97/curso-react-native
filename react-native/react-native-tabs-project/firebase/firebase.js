import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAdvHEiixPLr5QOyHjD31mx3O0mzvD5P48",
    authDomain: "app-medicos-3cca4.firebaseapp.com",
    databaseURL: "https://app-medicos-3cca4.firebaseio.com",
    projectId: "app-medicos-3cca4",
    storageBucket: "app-medicos-3cca4.appspot.com",
    messagingSenderId: "844944979642",
    appId: "1:844944979642:web:ea0c41db2274ad75"
};
const Firebase = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const firestore = Firebase.firestore();
export default Firebase;