import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseApp, firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

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
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorCode,
            errorMessage
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
        console.error("Error al registrar usuario:", error); // Esto te dará más detalles
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}
