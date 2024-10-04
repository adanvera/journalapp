import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";


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