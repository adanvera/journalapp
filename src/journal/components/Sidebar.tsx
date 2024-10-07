import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SidebarItem } from './SidebarItem';

export const Sidebar = ({ drawerWidth = 240 }) => {
    const { displayName } = useSelector((state: RootState) => state.auth) // Type the state
    const { notes } = useSelector((state: RootState) => state.journal) // Type the state
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SidebarItem key={note.id} note={note} />
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}