import { SaveOutlined, Start } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { setActiveNote, startSaveNote } from '../../store/journal'
import Swal from 'sweetalert2'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, savedMessage , isSaving} = useSelector((state: any) => state.journal);
    const { body, title, onInputChange, date, formState } = useForm(note);

    const showDate = useMemo(() => {
        const newDate = new Date(date);
        //return `${newDate.getDate()} de ${newDate.toLocaleString('es-ES', { month: 'long' })} de ${newDate.getFullYear()}`
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire({
                title: 'Nota actualizada',
                text: savedMessage,
                icon: 'success'
            });
        }
    }, [savedMessage]);

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="space-between"
            sx={{
                mb: 1
            }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item >
                <Typography fontSize={39} fontWeight='light'>
                    {showDate}
                </Typography>
            </Grid>
            <Grid item >
                <Button
                    color='primary'
                    sx={{
                        padding: 2
                    }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined
                        sx={{
                            mr: 1,
                            fontSize: 30
                        }}
                    />
                    Guardar
                </Button>
            </Grid>
            <Grid container >
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Título de la nota'
                    label='Título'
                    value={title}
                    name='title'
                    onChange={onInputChange}
                    sx={{
                        mb: 1
                    }}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='Que sucedio en el dia de hpy'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <ImageGallery />

        </Grid>
    )
}
