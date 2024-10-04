import { CssBaseline, ThemeProvider } from "@mui/material"

import { ReactNode } from 'react';
import { purpleTheme } from "./";

interface AppThemeProps {
    children: ReactNode;
}

export const AppTheme = ({ children }: AppThemeProps) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
