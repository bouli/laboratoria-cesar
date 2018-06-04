import firebase from 'firebase';
require('firebase/firestore');

const config = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "..."
};

if (!firebase.apps.length) {

  firebase.initializeApp(config);
}

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
const dbFeed = db.collection('feed');
export {dbFeed,firebase};
