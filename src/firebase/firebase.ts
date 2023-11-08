import {
    NextOrObserver,
    User,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

import { getFirebaseConfig } from './firebaseSetup';
import { initializeApp } from "firebase/app";

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const signInUser = async (
    email: string,
    password: string
) => {
    if (!email && !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
}

export const signOutUser = async () => await signOut(auth);