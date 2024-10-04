import { Button, Grid, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"

export const RegisterPage = () => {
  return (
    <AuthLayout title="Registro">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField fullWidth type="text" label="Nombre" placeholder="Nombre" />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField fullWidth type="email" label="Email" placeholder="Email" />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField fullWidth type="password" label="Constraseña" placeholder="Constraseña" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
            >Crear cuenta
            </Button>
          </Grid>
          <Grid container direction='row' justifyContent='end' sx={{ mt: 3 }}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to='/auth/login'>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}