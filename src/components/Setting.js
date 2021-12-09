import React from 'react';
import useState from 'react-hook-use-state';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from "react-router-dom";
export default function Setting(props) {
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
                    <Link to='/profile'><ListItemText primary="Change Profile" /></Link>
                    <ListItemText primary="Logout" onClick={props.logOut} />
                </List>
            </Collapse>
        </div>
    )
}