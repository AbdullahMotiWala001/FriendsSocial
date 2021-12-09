import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { app, db, storage } from './Firebase';


const Signup = () => {
    const metadata = {
        contentType: 'image/jpeg'
    };
    const navigate = useNavigate();
    let name, value

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        // gender: null,
    })

    const getUser = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    // const getUser = (e) => {
    //     setUser({
    //         name: e.target.value,
    //         email: "",
    //         phone: "",
    //         password: "",
    //         gender: null,
    //     })
    // }

    //
    // const dpGetting = (dp) => {
    //     const dpRef = ref(storage, `/dpIamges/${user.email}`);
    //     uploadBytes(dpRef, user.userDp)
    // }

    //
    const sendingData = () => {
        const dpImage = document.getElementById("dpImage").files[0]
        const storageRef = ref(storage, 'dpImages/' + user.email);
        const uploadTask = uploadBytesResumable(storageRef, dpImage, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDoc(doc(db, 'profile', user.email), {
                        dpLink: downloadURL,
                        ...user
                    }).then(() => { alert('Post added Successfully'); navigate('/') })
                });
            }
        );
    }

    //
    const fireBaseSignUp = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                sendingData()
                alert("You have successfully Signup")
                navigate('/')
                // userEmail = user.email
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message;
                alert(errorCode)
                // console.log(user.userDp)
            });


    };

    const paperStyle = {
        padding: 20,
        margin: '20px auto',
        width: 300,
        height: '70vh'
    };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: "#1bbd7e", height: '70px', width: '70px' };
    const marginTop = { marginTop: 5 };

    return (
        <div className="form">
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <AddCircleOutlineOutlinedIcon />
                        </Avatar>
                        <h2 style={headerStyle}>Sign Up</h2>
                        <Typography variant="caption" gutterBottom>
                            Please fill this form to create an account !
                        </Typography>
                    </Grid>
                    <form>
                        <TextField onChange={getUser} fullWidth label="Name" value={user.name} name="name" />
                        <TextField onChange={getUser} fullWidth label="Email" value={user.email} name="email" />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            value={user.phone}
                            onChange={getUser}
                            name="phone"
                        />
                        <FormControl component="fieldset" style={marginTop}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                                style={{ display: "initial" }}
                            >
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                />
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={getUser}
                            name="password"
                        />
                        <input type='file' id='dpImage' name='userDp' accept=".png, .jpg, .jpeg" style={marginTop} placeholder="add your image" />
                        <Button onClick={fireBaseSignUp} variant="contained" color="primary" style={{ margin: '10px' }} >
                            Sign up
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};

export default Signup;