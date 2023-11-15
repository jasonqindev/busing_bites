const firebaseConfig = {
    apiKey: "AIzaSyAqathouN5NbvaOPY1ryIJ4auBQFEjtGcQ",
    authDomain: "cs353-team-18.firebaseapp.com",
    databaseURL: "https://cs353-team-18-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cs353-team-18",
    storageBucket: "cs353-team-18.appspot.com",
    messagingSenderId: "415757809523",
    appId: "1:415757809523:web:6a25c8a7eaa680613eb706",
    measurementId: "G-CZT543S7VH"
};


export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        throw new Error('No Firebase configuration object provided.');
    } else {
        return firebaseConfig;
    }
}