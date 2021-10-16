import firebase from "firebase/app";
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyA0NpBvmnAuS5MFg5XYxt67jc7-NyHLdwI",
    authDomain: "go-chat-2fc75.firebaseapp.com",
    projectId: "go-chat-2fc75",
    storageBucket: "go-chat-2fc75.appspot.com",
    messagingSenderId: "191395668725",
    appId: "1:191395668725:web:7dcc12d43d660f6f66dbbc"
}).auth();

