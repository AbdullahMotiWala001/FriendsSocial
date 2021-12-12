// import React from 'react';
// import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
// import useState from 'react-hook-use-state';
// import paperStyle from './Navbar';
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { app, db, storage } from './Firebase';
// import { useNavigate } from 'react-router-dom';



// export default function ProfilePage() {
//     const auth = getAuth()
//     const user = auth.currentUser;

//     const navigate = useNavigate();

//     const [userBio, setUserBio] = useState({
//         bio: "",
//         phone: "",
//         name: "",
//         email: ""

//     })
//     const docRef = doc(db, "profile", user.email);
//     useEffect(() => {
//         if (user) {
//             getDoc(docRef).then(docSnap => {
//                 if (docSnap.exists()) {
//                     setUserBio({
//                         bio: docSnap.data().bio,
//                         name: docSnap.data().name,
//                         email: docSnap.data().email,
//                         phone : docSnap.data().phone 
//                     })
//                 }
//             })
//         }
//     })
//     const updateUser = () => {
//         setDoc(docRef).then(docSnap => {
//             ...userBio
//         }
//         )
//     }

//     const changeState = (e) => {
//         let { name, value } = e.target;
//         setUserBio({ ...bio, [name]: value })
//     }

//     const formStyle = {
//         marginTop: 50,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'spaceBetween',
//         'height': '70vh',
//     }
//     return (
//         <div style={formStyle}>
//             <TextField
//                 onChange={changeState}
//                 name="Bio"
//                 id="outlined-multiline-static"
//                 label="Bio"
//                 multiline
//                 rows={4}
//                 value={userBio.bio}
//             />
//             <TextField
//                 onChange={changeState}
//                 name="name"
//                 id="outlined-multiline-static"
//                 label="Name"
//                 multiline
//                 rows={4}
//                 value={userBio.name}
//             /> <TextField
//                 onChange={changeState}
//                 name="email"
//                 id="outlined-multiline-static"
//                 label="Email"
//                 multiline
//                 rows={4}
//                 value={bio.email}
//             />
//             <TextField
//                 onChange={changeState}
//                 name="email"
//                 id="outlined-multiline-static"
//                 label="Email"
//                 multiline
//                 rows={4}
//                 value={userBio.phone}
//             />
//             <input type="file" name="postImage" id="postImage" />
//             <Button variant='contained' onClcikc={updateUser}>Save Changes</Button>
//         </div>
//     )
// }


import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}
