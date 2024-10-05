import {
    registerUSerWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const startLoginMailPassword = (email: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        const result = await signInWithEmailPassword(email, password);
        if (!result.ok) {
            if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));
        }
        dispatch(login({
            email: result.email,
            displayName: result.displayName,
            photoURL: result.photoURL,
            uid: result.uid
        }))
    }
}

export const checkingAuthentications = (email: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
    }
};

export const startGoogleSignIn = () => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result || !result.ok) {
            return dispatch(logout(result?.errorMessage));
        }
        dispatch(login(result));
    }
}

interface UserCredentials {
    email: string;
    password: string;
    displayName: string;
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: UserCredentials) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        const result = await registerUSerWithEmailPassword(email, password, displayName);
        if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));
        dispatch(login({
            email: result.email,
            displayName: result.displayName,
            photoURL: result.photoURL,
            uid: result.uid
        }))
    }
}