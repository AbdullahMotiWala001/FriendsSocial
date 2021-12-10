import React from 'react';
import Post from './Post';
import useEffect from 'react-hook-use-state';
import useState from 'react-hook-use-state';
import Navbar from './Navbar';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db, storage } from './Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, query, where, onSnapshot, getDocs, doc } from "firebase/firestore";



export default function Home() {
    const [postArr, setPostArr] = useState(["1"]);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    //authentication
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserEmail(user.email);
        } else {
            navigate('/login')
        }
    });

    //reteriving
    const myArr = [];
    useEffect(() => {
        onSnapshot(collection(db, 'posts'), (snapShot) => setPostArr(snapShot.docs.map((doc) => (doc.data()))))
    }, []);
    // }

    return (
        <>
            <Navbar />
            <h1>Posts</h1>
            <Link to="PostForm">Add More</Link><br />
            {postArr.map((e) => <Post postDate={e.timeStamp} author={e.author} postDesc={e.descrip} postImage={e.postImage} />)}
        </>
    );
}
