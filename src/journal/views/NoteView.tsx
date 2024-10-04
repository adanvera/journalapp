import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'

export const NoteView = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="space-between"
            sx={{
                mb: 1
            }}
        >
            <Grid item >
                <Typography fontSize={39} fontWeight='light'>
                    03 de Octubre de 2024
                </Typography>
            </Grid>
            <Grid item >
                <Button
                    color='primary'
                    sx={{
                        padding: 2
                    }}
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
                />
            </Grid>

            <ImageGallery />

        </Grid>
    )
}
