import React from 'react'
import { Link } from "react-router-dom";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { getStorage, ref } from "firebase/storage";
import { width } from '@mui/system';

export default function Navbar() {
    let imageUrl = "data:image/png;base64,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"
    const storage = getStorage();
    const imagesRef = ref(storage, `image/${imageUrl}`);
    const paperStyle = {
        height: '5vh',
        padding: 10
    }
    const avatarStyle = {
        height: 20,
        width: 20,
    }
    return (
        <div>
            <Paper elevation={5} style={paperStyle}>
                <Grid container spacing={8} justifyContent="center">
                    <Grid item>
                        <Avatar><img src="" alt="" /></Avatar>
                    </Grid>
                    <Grid item>
                        <Typography>
                            <p>User</p>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="text"> <Link to='./login'><SwitchAccountIcon title="Switch User" /></Link> </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
