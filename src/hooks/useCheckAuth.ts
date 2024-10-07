import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { firebaseAuth } from "../firebase";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
    const dispatch = useDispatch();
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
