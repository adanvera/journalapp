import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NoSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="animate__animated animate__fadeIn animate__faster"
      sx={{
        minHeight: 'calc(100vh - 43%)',
        backgroundColor: 'primary.main',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color:'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography
        color="white"
        variant="h5"
        >Selecciona o crea una nota</Typography>
      </Grid>
    </Grid>
  )
}