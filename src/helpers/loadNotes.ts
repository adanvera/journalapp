import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseBD } from "../firebase";

export const loadNotes = async( uid = '' ) => {
    
    if (uid === '' || uid === null) {
        throw new Error('uid does not exist');
    }

    const notesCollection = collection(firebaseBD, `${uid}/journal/notes`);
    const docs = await getDocs(notesCollection);
    const notes: any[] = [];
    
    docs.forEach(doc => {
        notes.push({
            id: doc.id,
            ...doc.data()
        });
    });    

    return notes;
};