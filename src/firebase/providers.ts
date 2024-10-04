import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
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