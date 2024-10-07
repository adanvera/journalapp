import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { firebaseAuth } from "../firebase";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = (): string => {
    const dispatch: AppDispatch = useDispatch();
    const { status } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user) {
                dispatch(logout({ errorMessage: 'No user logged' }));
                return;
            }
            const { uid, displayName, email, photoURL } = user;
            dispatch(startLoadingNotes());
            dispatch(login({ uid, displayName, email, photoURL }));
        });
    }, [dispatch,]);
    return status;
}
