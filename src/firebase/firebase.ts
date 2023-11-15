import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    NextOrObserver,
    User,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import { getFirebaseConfig } from './firebaseSetup';

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
    try {
        await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
            console.log(err)
        );
        if (!auth.currentUser) return;
        await sendEmailVerification(auth.currentUser).catch((err) =>
            console.log(err)
        );
        await updateProfile(auth.currentUser, { displayName: name }).catch(
            (err) => console.log(err)
        );
    } catch (err) {
        console.log(err);
    }
};

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

export const SignOutUser = async () => await signOut(auth);