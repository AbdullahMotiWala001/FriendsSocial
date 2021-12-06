import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ViewColumn } from '@material-ui/icons';
import { height, width } from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useState from 'react-hook-use-state';
import { doc, setDoc } from "firebase/firestore";





const Postform = () => {
    let name, value
    const [post, setPost] = useState({
        title: "",
        descrip: "",
        // postImage: "",
    })
    const userPost = (e) => {
        name = e.target.name
        value = e.target.value
        setPost({ ...post, [name]: value })
    }
    //Sending Post to firebase
    const sentPost = async () => {
        //continue
        console.log(post)
    }


    const navigate = useNavigate();
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
            <input type="file" name="postImage" id="" />
            <Button variant='contained' onClick={sentPost}>Submit</Button>
        </div>
    );
}

export default Postform;
