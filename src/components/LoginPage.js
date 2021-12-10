import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './Firebase';
import { useHistory } from 'react-router-dom';
import useState from 'react-hook-use-state';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Link } from "react-router-dom";



export default function LoginPage() {
    const [user, setUser] = useState({
        name: "",
        email: "",
    })

    const changeHandler = (e) => {
        setUser(e.target.value)
    }
    
    const auth = getAuth();
    const history = useHistory();
    signInWithEmailAndPassword(auth, user.name, user.password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        history.push("Home");
        // ...
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.code);
        });


    const paperStyle = {
        padding: 20,
        margin: '20px auto',
        width: 300,
        height: '70vh'
    }
    const avatarStyle = {
        backgroundColor: '#00A36C'
    }



    return (
        <>
            <Grid alig>

                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Login</h2>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    </Grid>
                    <Grid marginTop={1}>
                        <h1 style={{ color: '#00A36C' }}>F.R.I.E.N.D.S</h1>
                    </Grid>
                    <TextField onChange={changeHandler} label="Email" variant="standard" fullWidth required value={user.name}></TextField>
                    <TextField onChange={changeHandler} label="Password" variant="standard" fullWidth required value={user.password}></TextField>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Remembre me" />
                    </FormGroup>
                    <Button color='primary' fullWidth variant='contained'>Sign In</Button>
                    <Typography >
                        Do you have an account ? <Link style={{ cursor: 'pointer' }} to="/signup"> Sign Up </Link>
                    </Typography>
                </Paper>
            </Grid>
        </>
    )
}
