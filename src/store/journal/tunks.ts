import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseBD } from "../../firebase";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setImagesToNotes, setNotes, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
    status: string;
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    errorMessage: string | null;
}

interface JournalState {
    active: Note | null;
}

interface Note {
    id?: string;
    title: string;
    body: string;
    date: number;
    urlImages: string[];
}

export const startNewNote = () => {
    return async (dispatch: any, getState: () => { auth: AuthState }) => {
        dispatch(savingNewNote());
        const { auth: { uid } } = getState();
        const newNote : Note = {
            title: '',
            body: '',
            date: new Date().getTime(),
            urlImages: []
        }
        const newDoc = doc(collection(firebaseBD, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch: any, getState: () => { auth: AuthState }) => {
        const { auth: { uid } } = getState();
        if (!uid) {
            console.error("User ID is null or undefined");
            return;
        }
        const loadedNotes = await loadNotes(uid);
        dispatch(setNotes(loadedNotes));
    };
};

export const startSaveNote = () => {
    return async (dispatch: any, getState: () => { auth: AuthState; journal: JournalState; }) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        if (!note) {
            console.error("Active note is null or undefined");
            return;
        }
        const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });
        if (note) {
            dispatch(updateNote({
                ...note,
                id: note.id || '',
                title: note.title || '',
                body: note.body || '',
                date: note.date || new Date().getTime(),
                urlImages: note.urlImages || []
            }));
        } else {
            console.error("Active note is null or undefined");
        }
    }
};



export const startUploadingFiles = (files: File[]) => {
    return async (dispatch: any, getState: () => { auth: AuthState; journal: JournalState; }) => {
        dispatch(setSaving());

        try {
            const fileUploadPromises = files.map(file => fileUpload(file));
            const urlImages = await Promise.all(fileUploadPromises);
            const { auth: { uid } } = getState();
            const { active: note } = getState().journal;

            if (Array.isArray(urlImages)) {
                dispatch(setImagesToNotes({
                    ...note,
                    title: note?.title || '',
                    body: note?.body || '',
                    date: note?.date || new Date().getTime(),
                    urlImages
                }));
            } else {
                console.error("urlImages no es un array:", urlImages);
            }

            const noteToFireStore = { ...note };
            delete noteToFireStore.id;
            if (!note) {
                console.error("Active note is null or undefined");
                return;
            }
            const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);
            await setDoc(docRef, noteToFireStore, { merge: true });
            if (note) {
                dispatch(updateNote({
                    ...note,
                    id: note.id || '',
                    title: note.title || '',
                    body: note.body || '',
                    date: note.date || new Date().getTime(),
                    urlImages
                }));
            } else {
                console.error("Active note is null or undefined");
            }
        } catch (error) {
            console.error("Error subiendo archivos:", error);
        }
    }
};


export const startDeletingNote = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: any, getState: () => { auth: AuthState; journal: JournalState; }) => {
        const { auth: { uid } } = getState();
        const { active: note } = getState().journal;
        if (note) {
            const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);
            await deleteDoc(docRef)
            if (note.id) {
                dispatch(deleteNoteById(note.id));
            } else {
                console.error("Note ID is undefined");
            }
        } else {
            console.error("Active note is null or undefined");
        }
    }
}
