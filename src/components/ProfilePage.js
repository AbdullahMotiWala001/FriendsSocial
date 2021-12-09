import React from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import useState from 'react-hook-use-state';
import paperStyle from './Navbar';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db, storage } from './Firebase';
import { useNavigate } from 'react-router-dom';




export default function ProfilePage() {
    const auth = getAuth()
    const navigate = useNavigate();

    const [bio, setBio] = useState({
        bio: "",
        name: "",
        email: ""

    })
        if (user) {
            const docRef = doc(db, "profile", user.email);
            getDoc(doc(db, "profile", user.email)).then(docSnap => {
                if (docSnap.exists()) {
                    setBio({
                        bio: docSnap.data().bio,
                        name: docSnap.data().name,
                        email: docSnap.data().email
                    })
                }
                else {
                    navigate('/login')
                }
            })
        }
    // })

    const changeState = (e) => {
        let { name, value } = e.target;
        setBio({ ...bio, [name]: value })
    }

    const formStyle = {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
        'height': '70vh',
    }
    return (
        <div style={formStyle}>
            <TextField
                onChange={changeState}
                name="Bio"
                id="outlined-multiline-static"
                label="Bio"
                multiline
                rows={4}
                value={bio.bio}
            />
            <TextField
                onChange={changeState}
                name="name"
                id="outlined-multiline-static"
                label="Name"
                multiline
                rows={4}
                value={bio.name}
            /> <TextField
                onChange={changeState}
                name="email"
                id="outlined-multiline-static"
                label="Email"
                multiline
                rows={4}
                value={bio.email}
            />
            {/* <input type="file" name="postImage" id="postImage" /> */}
            <Button variant='contained' >Save Changes</Button>
        </div>
    )
}
