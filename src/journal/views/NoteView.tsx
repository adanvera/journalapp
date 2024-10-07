import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Divider, Grid, IconButton, Input, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { createRef, useEffect, useMemo } from 'react'
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import Swal from 'sweetalert2'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, savedMessage, isSaving } = useSelector((state: any) => state.journal);
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

    const inputFileRef = createRef<HTMLInputElement>();

    const onFileChange = (e: any) => {
        if (e.target.files.length === 0) {
            return;
        }
        const files = Array.from(e.target.files);
        dispatch(startUploadingFiles(files));
    }

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
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <Grid item >
                    <Typography
                        fontSize={20}
                        fontWeight='bolt'
                        fontFamily={'Roboto'}
                        color='primary'
                        fontWeight={'bold'}
                    >
                        {showDate}
                    </Typography>
                </Grid>
                <Grid item >
                    <input
                        type='file'
                        id='file'
                        multiple
                        onChange={onFileChange}
                        style={{ display: 'none' }}
                        ref={inputFileRef}
                        accept="image/*" // Allow only images
                        />
                    <IconButton disabled={isSaving}
                        onClick={() => {
                            inputFileRef.current?.click();
                        }}
                    >
                        <UploadOutlined
                            color='primary'
                            sx={{
                                fontSize: 30
                            }}
                        />
                    </IconButton>
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
            </Grid>
            <Divider
                sx={{
                    mb: 5,
                    border: 1,
                    borderColor: 'primary.main',
                    width: '100%'
                }}

            />
            <Grid container
                sx={{
                    mb: 5
                }}
            >
                <TextField
                    type='text'
                    variant='outlined'
                    fullWidth
                    placeholder='Título de la nota'
                    label='Título'
                    value={title}
                    name='title'
                    onChange={onInputChange}
                    sx={{
                        mb: 1,
                        backgroundColor: 'white',
                    }}
                />
                <TextField
                    type='text'
                    variant='outlined'
                    fullWidth
                    multiline
                    placeholder='Agregar descripción aqui'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid item >
                <Typography
                    fontSize={20}
                    fontWeight='bolt'
                    fontFamily={'Roboto'}
                    color='primary'
                >
                    Imagenes
                </Typography>
            </Grid>
            <Divider
                sx={{
                    mt: 1,
                    mb: 5,
                    border: 1,
                    borderColor: 'primary.main',
                    width: '100%'
                }}bold
            />
            <ImageGallery images={note.urlImages} />
        </Grid>
    )
}
