import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ViewColumn } from '@material-ui/icons';
import { height, width } from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useState from 'react-hook-use-state';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { app, db, storage } from './Firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";








const Postform = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const storage = getStorage();

    const metadata = {
        contentType: 'image/jpeg'
    };
    //Initial Data
    const [userEmail, setUserEmail] = useState("");
    const [postLink, setPostLink] = useState(null);
    const [post, setPost] = useState({
        title: "",
        descrip: "",
    })

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserEmail(user.email);
        } else {
            // User is signed out
            // ...
        }
    });

    //Sending Post to firebase
    const sentPost = () => {
        let time = new Date();
        let timeStamp = time.getTime().toString();
        const postIamge = document.getElementById("postImage").files[0]
        const storageRef = ref(storage, 'postImages/' + userEmail + '/' + timeStamp);
        const uploadTask = uploadBytesResumable(storageRef, postIamge, metadata);
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
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
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
                    setDoc(doc(db, 'users', userEmail, 'posts', timeStamp), {
                        post,
                        postImage: downloadURL
                    }).then(() => { alert('Post added Successfully'); navigate('/')})
                });
            }
        );
    }

    //changing state dynamically
    let name, value
    const userPost = (e) => {
        name = e.target.name
        value = e.target.value
        setPost({ ...post, [name]: value })
    }
    //Sending Post to firebase
    // const myPost = () => {
    //     let time = new Date();
    //     let timeStamp = time.getTime().toString();
    //     console.log(postLink)
    //     setDoc(doc(db, 'users', userEmail, 'posts', timeStamp), {
    //         post
    //     })

    //         .then(() => { alert('Post added Successfully') })
    // }



    const formStyle = {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
        'height': '70vh',
    }
    return (
        <div style={formStyle}>
            <TextField onChange={userPost} id="outlined-basic" label="Title" variant="outlined" name="title" />
            <TextField
                onChange={userPost}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="descrip"
            />
            <input type="file" name="postImage" id="postImage" />
            <Button variant='contained' onClick={sentPost}>Submit</Button>
        </div>
    );

}
export default Postform;
