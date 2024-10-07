import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoSelectedView, NoteView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"
import { AppDispatch } from "../../store"

export const JournalPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isSaving, active} = useSelector((state: any) => state.journal);  

  const handleAddNew = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {
        !active ? <NoSelectedView /> : <NoteView />
      }
      <IconButton
        size="large"
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {
            backgroundColor: 'error.main', opacity: 0.8
          },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={handleAddNew}
      >
        <AddOutlined sx={{
          fontSize: 30
        }} />
      </IconButton>

    </JournalLayout>
  )
}