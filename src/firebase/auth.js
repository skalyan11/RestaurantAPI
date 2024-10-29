import { createUserWithEmailAndPassword, GoogleAuthProvider,  signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, updatePassword, updateEmail, sendEmailVerification } from 'firebase/auth';
import {auth} from './firebaseConfig';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
    //result.user, save it into firestore
    return result;
};

export const doSignOut = async () => {
    return signOut(auth);
};

export const doPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password) => {
    return updatePassword(auth.currentUser, password);
};


export const doUpdateEmail = async (email) => {
    return updateEmail(auth.currentUser, email);
};

export const doSendEmailVerification = async () => {

    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`, // Your redirect URL
    });
};
// Compare this snippet from src/contexts/auth/index.jsx: