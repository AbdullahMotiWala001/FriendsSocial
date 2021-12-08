import React from 'react'
import { Link } from "react-router-dom";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { getStorage, ref } from "firebase/storage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { app, db, storage } from './Firebase';
import { width } from '@mui/system';
import Setting from './Setting.js';
import useState from 'react-hook-use-state';
import { getFirestore } from '@firebase/firestore';

const pathReference = ref(storage, 'images/stars.jpg');

export default function Navbar() {


    //calling userData
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    const storage = getStorage();
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
                            <p></p>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="text"> <Link to='./login'><SwitchAccountIcon title="Switch User" /></Link> </Button>
                    </Grid>
                    <Grid item>
                        <Setting />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
