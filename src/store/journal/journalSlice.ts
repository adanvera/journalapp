import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
    id: string;
    title: string;
    body: string;
    date: number;
    urlImages: string[];
}

interface JournalState {
    isSaving: boolean;
    savedMessage: string;
    notes: Note[];
    active: Note | null;
}

const initialState: JournalState = {
    isSaving: false,
    savedMessage: '',
    notes: [],
    active: null
    // active: {
    //     id: 'ABDC',
    //     title: '',
    //     body: '',
    //     date: 0,
    //     urlImages: []
    // }
};

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<Note>) => {
            state.active = action.payload;
            state.savedMessage = '';
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.isSaving = false;
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                } else {
                    return note;
                }
            });
            state.savedMessage = 'Nota actualizada correctamente';
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        setImagesToNotes: (state, action: PayloadAction<Note>) => {
            if (state.active) {
                state.active.urlImages = [...state.active.urlImages, ...action.payload.urlImages];
            }
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.active = null;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setImagesToNotes,
    clearNotesLogout
} = journalSlice.actions;