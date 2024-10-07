import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal';
import { useTheme, Theme } from '@mui/material/styles';

interface Note {
    title: string;
    body: string;
    id: string;
    date: number;
    urlImages: string[];
}

export const SidebarItem = ({ note }: { note: Note }) => {
    const dispatch = useDispatch();
    const { title, body, id, date, urlImages } = note;
    const { active } = useSelector((state: any) => state.journal);
    const itemActive = active && active.id === id ? active.id : '';

    const newTitle = useMemo(() => {
        if (title) {
            return title?.length > 12 ? title?.substring(0, 12) + '...' : title
        }
    }, [title]);

    const onClickNote = () => {
        dispatch(setActiveNote({
            title,
            body,
            id,
            date,
            urlImages
        }));
    }

    // access to the main primary color
    const theme: Theme = useTheme();
    const primaryColor = theme.palette.primary.main || '';
    const mainColor = itemActive === id ? primaryColor : '';

    return (
        <ListItem disablePadding 
            sx={{
                borderRight: itemActive === id ? `6px solid ${primaryColor}` : '6px solid transparent',
                borderLeft: itemActive === id ? `6px solid ${primaryColor}` : '6px solid transparent',
                transition: 'border-left 0.3s',
                backgroundColor: itemActive === id ? 'rgba(0,0,0,0.04)' : 'transparent',
            }}
        >
            <ListItemButton onClick={onClickNote}
                sx={{
                    color: mainColor,
                }}
            >
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
