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
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.isSaving = false;
            state.notes = action.payload;
        },
        setSaving: (state ) => {
            state.isSaving = true;
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

            //TODO mostrar mensaje de guardado
        },
        deleteNoteById: (state, action: PayloadAction<string>) => { },
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
    savingNewNote
} = journalSlice.actions;