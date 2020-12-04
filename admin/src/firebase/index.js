import firebase from 'firebase/app'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDAYQl2W27B3FBu3oLLfSzVqPexXGXHzlQ",
    authDomain: "onlinecourse-d8a99.firebaseapp.com",
    databaseURL: "https://onlinecourse-d8a99.firebaseapp.com",
    projectId: "onlinecourse-d8a99",
    storageBucket: "onlinecourse-d8a99.appspot.com",
    messagingSenderId: "47916480839",
    appId: "1:47916480839:web:8006fda8af3851b67a7462"
  }
  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage()
  export {storage, firebase as default }
