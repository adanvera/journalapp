import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField fullWidth type="text" label="Correo" placeholder="correo" />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField fullWidth type="password" label="Contraseña" placeholder="contraseña" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
            >Iniciar sesión
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
            >
              <Google />
              <Typography sx={{ ml: 1 }}> Google</Typography>
            </Button>
          </Grid>
          <Grid container direction='row' justifyContent='end' sx={{ mt: 3 }}>
            <Link component={RouterLink} color="inherit" to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}