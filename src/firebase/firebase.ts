import {
    NextOrObserver,
    User,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    confirmPasswordReset,
    sendPasswordResetEmail
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

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (!auth.currentUser) return;
    await sendEmailVerification(auth.currentUser)
    await updateProfile(auth.currentUser, { displayName: name })
};

export const sendThePasswordResetEmail = async (email: string) => {
    if (!email) return;
    await sendPasswordResetEmail(auth, email);
}

export const confirmThePasswordReset = async (code: string, newPassword: string) => {
    if (!code && !newPassword) return;
    await confirmPasswordReset(auth, code, newPassword);
}

export const updateProfilePicture = async (photoURL: string) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { photoURL }).catch((err) =>
        console.log(err)
    );
}

export const updateProfileName = async (displayName: string) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName }).catch((err) =>
        console.log(err)
    );
}

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
}

export const signOutUser = async () => await signOut(auth);
