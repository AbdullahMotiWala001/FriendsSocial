import React from 'react';
import useState from 'react-hook-use-state';
import Navbar from './Navbar';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { app, db, storage } from './Firebase';




export default function Home() {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    //authentication
    onAuthStateChanged(auth, (user) => {
        console.log("pak")
        if (user) {
            console.log(user.email)
            setUserEmail(user.email);
            // retrieveData()
            // ...
        } else {
            navigate('/login')
        }
    });

    console.log(setUserEmail)
    //reterieving post
    const retrieveData = () => { }
    const my = 'usermeial'
    const unsub = onSnapshot(doc(db, 'users', 'ams@gmial.com', 'posts', "1638911187374"), (doc) => {
        console.log("Current data: ", doc.data());
    });


return (
    <div>
        <Navbar />
        <h1>Posts</h1>
        <Link to="PostForm">Add More</Link>
    </div>
)
}
