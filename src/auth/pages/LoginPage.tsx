import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { startGoogleSignIn, startLoginMailPassword } from "../../store/auth"
import { useEffect, useMemo, useState } from "react"

export const LoginPage = () => {

  const { formState: { email, password }, onInputChange } = useForm({ email: '', password: '' });
  const dispatch: AppDispatch = useDispatch() // Type the dispatch
  const { status, errorMessage } = useSelector((state: RootState) => state.auth) // Type the state
  const isAuthenticating = useMemo(() => status === 'checking', [status])
  const [showError, setShowErrorMessages] = useState(false)
  
  useEffect(() => {
    setShowErrorMessages(false);
  } , [email, password])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(email, password)
    dispatch(startLoginMailPassword(email, password))
    if (errorMessage) setShowErrorMessages(true)
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
        {
          showError &&
          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}>
            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>
        }
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