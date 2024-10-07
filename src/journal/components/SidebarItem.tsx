import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useMemo } from 'react';

interface SidebarItemProps {
    title: string;
    body: string;
    id: string | number;
}

export const SidebarItem = ({title, body, id}: SidebarItemProps) => {
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title
    } , [title]);
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemButton>
                    <TurnedInNot />
                </ListItemButton>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
