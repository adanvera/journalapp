import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseBD } from "../../firebase";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch: any, getState: () => { auth: { uid: any; }; }) => {
        dispatch(savingNewNote());
        const { auth: { uid } } = getState();
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            id: '',
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
    return async (dispatch: any, getState: () => { auth: { uid: any; }; }) => {
        const { auth: { uid } } = getState();
        const loadedNotes = await loadNotes(uid);
        dispatch(setNotes(loadedNotes));
    };
};