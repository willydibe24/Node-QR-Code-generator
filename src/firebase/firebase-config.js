import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const FIREBASE_KEY = import.meta.env.VITE_FIREBASE_KEY;
const ANALYTICS_KEY = import.meta.env.VITE_ANALYTICS_KEY; 

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "qr-code-generator-f883e.firebaseapp.com",
    projectId: "qr-code-generator-f883e",
    storageBucket: "qr-code-generator-f883e.appspot.com",
    messagingSenderId: "615179654886",
    appId: "1:615179654886:web:d3bb5e2b9611f6fa7b4d27",
    measurementId: ANALYTICS_KEY
};

let app;
let auth;

export function createApp() {
	if(!app) {
        app = initializeApp(firebaseConfig);
    }
    return app;
};

export function createAuth() {
    if(!auth) {
        auth = getAuth(createApp());
    }
    return auth;
}