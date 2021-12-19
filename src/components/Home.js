import React from 'react';
import Post from './Post';
import useEffect from 'react-hook-use-state';
import useState from 'react-hook-use-state';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from './Firebase';
import { collection, onSnapshot } from "firebase/firestore";
import NavBar from './NavBar';
import { doc, getDoc } from "firebase/firestore";



export default function Home() {
    const [postArr, setPostArr] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userDetail, setUserDetail] = useState({})
    const navigate = useNavigate();
    const auth = getAuth();
    //authentication
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserEmail(user.email);
            const userId = user.uid;
            getDoc(doc(db, "profile", userId)).then(docSnap => {
                if (docSnap.exists()) {
                    setUserDetail(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            })
        } else {
            navigate('/login')
        }
    });
    //reteriving
    useEffect(() => {
        onSnapshot(collection(db, 'posts'), (snapShot) => setPostArr(snapShot.docs.map((doc) => (doc.data()))))
    }, []);

    return (
        <>
            <NavBar dp={userDetail.dpLink} />
            <h1>Posts</h1>
            <Link to="PostForm">Add More</Link><br />
            {postArr.map((e) => <Post postDate={e.timeStamp} author={e.author} postDesc={e.descrip} postImage={e.postImage} dp={e.dp} />)}
        </>
    );
}
