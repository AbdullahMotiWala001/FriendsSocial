import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useState from 'react-hook-use-state';
import { doc, setDoc } from "firebase/firestore";
import { db } from './Firebase';
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
    const [postDet, setPostDet] = useState({
        descrip: "",
        title: "",
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
        let timeStampString = time.getTime().toString();
        let timeStamp = time.getTime();
        const postIamge = document.getElementById("postImage").files[0]
        const storageRef = ref(storage, 'postImages/' + userEmail + '/' + timeStampString);
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
                    setDoc(doc(db, 'posts', timeStampString), {
                        ...postDet,
                        postImage: downloadURL,
                        time: timeStamp,
                        author: userEmail
                    }).then(() => { alert('Post added Successfully'); navigate('/') })
                });
            }
        );
    }

    const changeState = (e) => {
        let { name, value } = e.target;
        setPostDet({ ...postDet, [name]: value })
        console.log(postDet)
    }



    const formStyle = {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
        'height': '70vh',
        'width' : '50vh'
    }
    return (
        <div style={formStyle}>
            <TextField
                onChange={changeState}
                name="descrip"
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
