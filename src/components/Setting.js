import React from 'react';
import useState from 'react-hook-use-state';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
export default function Setting() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    }
    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <MoreVertIcon />
            </ListItemButton>
            <Collapse in={!open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemText primary="Change Profile" />
                </List>
            </Collapse>
        </div>
    )
}