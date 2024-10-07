import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

interface Note {
    title: string;
    body: string;
    id: string;
    date: number | string | null | undefined;
    urlImages: string[];
}

export const SidebarItem = ({ note }: { note: Note }) => {
    const dispatch = useDispatch();
    const { title, body, id, date, urlImages } = note;    

    const newTitle = useMemo(() => {
        if(title){
            return title?.length > 12 ? title?.substring(0, 12) + '...' : title
        }
    } , [title]);

    const onClickNote = () => {
        dispatch(setActiveNote({
            title,
            body,
            id,
            date,
            urlImages
        }));
    }

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={onClickNote}>
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
