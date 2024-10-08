import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseBD } from "../../firebase";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setImagesToNotes, setNotes, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

interface AuthState {
    uid: string;
}

interface JournalState {
    active: Note;
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
        const newNote = {
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
        const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });
        dispatch(updateNote(note));
    }
};



export const startUploadingFiles = (files: File[]) => {
    return async (dispatch: any, getState: () => { auth: AuthState; journal: JournalState; }) => {
        dispatch(setSaving());

        try {
            const fileUploadPromises = files.map(file => fileUpload(file));
            const urlImages = await Promise.all(fileUploadPromises);
            if (Array.isArray(urlImages)) {
                dispatch(setImagesToNotes({ urlImages }));
            } else {
                console.error("urlImages no es un array:", urlImages);
            }

            const { auth: { uid } } = getState();
            const { active: note } = getState().journal;

            const noteToFireStore = { ...note };
            delete noteToFireStore.id;

            const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);

            await setDoc(docRef, noteToFireStore, { merge: true });
            dispatch(updateNote({
                ...note,
                id: note.id || '',
                urlImages
            }));
        } catch (error) {
            console.error("Error subiendo archivos:", error);
        }
    }
};


export const startDeletingNote = () => {
    return async (dispatch: any, getState: () => { auth: AuthState; journal: JournalState; }) => {
        const { auth: { uid } } = getState();
        const { active: note } = getState().journal;
        const docRef = doc(firebaseBD, `${uid}/journal/notes/${note.id}`);
        const resp = await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))
    }
}
