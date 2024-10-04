import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: purple[900],
        },
        secondary: {
            main: purple[600],
        },
        error:{
            main: purple[500],
        }
    },
});