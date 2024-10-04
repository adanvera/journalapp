import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { checkingCredentials, startGoogleSignIn } from "../../store/auth"
import { useMemo } from "react"

export const LoginPage = () => {

  const { email, password, onInputChange } = useForm({ email: '', password: '' });
  const dispatch: AppDispatch = useDispatch() // Type the dispatch
  const { status } = useSelector((state: RootState) => state.auth) // Type the state
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(email, password)
    dispatch(checkingCredentials())
  }

  const onGoogleSignIn = () => {
    console.log('Google Sign In');
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              name="email"
              type="text"
              label="Correo"
              placeholder="correo"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Contraseña"
              placeholder="contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isAuthenticating}
            >Iniciar sesión
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
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