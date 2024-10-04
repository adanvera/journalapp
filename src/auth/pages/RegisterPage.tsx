import { Button, Grid, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { useState } from "react"

interface ValidationRule {
  (value: string): boolean;
}

interface FormValidations {
  [key: string]: [ValidationRule, string];
  email: [ValidationRule, string];
  displayName: [ValidationRule, string];
  password: [ValidationRule, string];
}

const formValidations: FormValidations = {
  email: [(value) => value.includes('@'), 'Email no es valido'],
  displayName: [(value) => value.length >= 1, 'Nombre es requerido'],
  password: [(value) => value.length > 5, 'La contraseña debe tener al menos 6 caracteres']
}

const formData = {
  email: '',
  displayName: '',
  password: '',
}

export const RegisterPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);

  const {
    email, emailValid,
    displayName, displayNameValid,
    password, passwordValid, isFormValid,
    onInputChange
  } = useForm(formData, formValidations);

  const onSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmited(true);
    console.log('Registrando usuario');
  }

  return (
    <AuthLayout title="Registro">
      <form onSubmit={onSubmitRegister}>
        <h1>formvaliddd :::: {isFormValid ? 'true' : 'false'}</h1>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="text"
              label="Nombre"
              placeholder="Nombre"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Constraseña"
              placeholder="Constraseña"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
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