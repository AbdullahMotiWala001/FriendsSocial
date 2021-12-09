import React from 'react'
import { Link } from "react-router-dom";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db, storage } from './Firebase';
import { width } from '@mui/system';
import Setting from './Setting.js';
import useState from 'react-hook-use-state';
import { getFirestore } from '@firebase/firestore';
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
    const [userName, setUserName] = useState("");
    const [userDp, setUserDp] = useState("");

    //calling userData
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const docRef = doc(db, "profile", user.email);
            getDoc(doc(db, "profile", user.email)).then(docSnap => {
                if (docSnap.exists()) {
                    setUserName(docSnap.data().name);
                    setUserDp(docSnap.data().dpLink);


                }
            })
        } else {
            // User is signed out
            // ...
        }
    });
    const paperStyle = {
        height: '8vh',
        padding: 10
    }
    const avatarStyle = {
        height: 20,
        width: 20,
    }
    return (
        <div>
            <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={8} justifyContent="center">
                    <Grid item>
                        <Avatar
                            alt="user profile image"
                            src={userDp}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography>
                            <p>{userName}</p>
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
