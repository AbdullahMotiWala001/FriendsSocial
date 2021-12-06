import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useState from 'react-hook-use-state';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { app } from './Firebase';


export default function LoginPage() {
    const navigate = useNavigate();

    let name, value
    const [user, setUser] = useState({
        email: "",
        password: "",
    })


    const getUser = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    
    const firebaseSignIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/')
            })
            .catch((error) => {
                alert(error.code);
            });

    }
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
            {/* <Navbar /> */}

            <Grid alig>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Login</h2>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    </Grid>
                    <Grid marginTop={1}>
                        <h1 style={{ color: '#00A36C' }}>F.R.I.E.N.D.S</h1>
                    </Grid>
                    <TextField name="email" onChange={getUser} label="Email" variant="standard" fullWidth required value={user.name}></TextField>
                    <TextField name="password" onChange={getUser} label="Password" variant="standard" fullWidth required value={user.password}></TextField>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Remembre me" />
                    </FormGroup>
                    <Button color='primary' fullWidth variant='contained' onClick={firebaseSignIn}>Sign In</Button>
                    <Typography >
                        Do you have an account ? <Link style={{ cursor: 'pointer' }} to="/signup"> Sign Up </Link>
                    </Typography>
                </Paper>
            </Grid>
        </>
    )
}
