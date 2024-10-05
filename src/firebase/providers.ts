import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();

export const signInWithEmailPassword = async (mail: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(firebaseAuth, mail, password);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error); // Esto te dará más detalles
        if (error instanceof FirebaseError) {
            const errorCode = (error as FirebaseError).code;
            const errorMessage = error.message;
            return {
                ok: false,
                errorCode,
                errorMessage
            }
        } else {
            return {
                ok: false,
                errorCode: 'unknown-error',
                errorMessage: 'An unknown error occurred'
            }
        }
    }
}

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        if (credentials) {
            const { displayName, email, photoURL, uid } = result.user;
            return {
                ok: true,
                displayName,
                email,
                photoURL,
                uid
            }
        }
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error); // Esto te dará más detalles
        if (error instanceof FirebaseError) {
            const errorCode = (error as FirebaseError).code;
            const errorMessage = error.message;
            return {
                ok: false,
                errorCode,
                errorMessage
            }
        } else {
            return {
                ok: false,
                errorCode: 'unknown-error',
                errorMessage: 'An unknown error occurred'
            }
        }
    }
}

export const registerUSerWithEmailPassword = async (mail: string, password: string, displayName: string) => {
    try {
        const result = await createUserWithEmailAndPassword(firebaseAuth, mail, password);
        const { email, photoURL, uid } = result.user;
        if (firebaseAuth.currentUser) {
            await updateProfile(firebaseAuth.currentUser, { displayName });
        }
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        console.error("Error al crear usuario:", error); // Esto te dará más detalles
        if (error instanceof FirebaseError) {
            const errorCode = (error as FirebaseError).code;
            const errorMessage = error.message;
            return {
                ok: false,
                errorCode,
                errorMessage
            }
        } else {
            return {
                ok: false,
                errorCode: 'unknown-error',
                errorMessage: 'An unknown error occurred'
            }
        }
    }
}
