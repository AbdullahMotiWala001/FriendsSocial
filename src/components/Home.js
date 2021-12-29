import React, { useContext } from 'react';
import Post from './Post';
import useLayoutEffect from 'react-hook-use-state';
import useState from 'react-hook-use-state';
import { Link } from "react-router-dom"
import { db } from './Firebase';
import { collection, onSnapshot } from "firebase/firestore";
import NavBar from './NavBar';
import { DpContext } from './userContext';
import SearcBar from './SearchBar'
//props passed error
import { flexbox } from '@mui/system';

export default function Home() {
    const dpContext = useContext(DpContext);
    console.log(dpContext)
    const [postArr, setPostArr] = useState([]);

    //reteriving
    useLayoutEffect(() => {
        onSnapshot(collection(db, 'posts'), (snapShot) => setPostArr(snapShot.docs.map((doc) => (doc.data()))))
    }, []);
    const postStyle = {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
    }
    return (
        <div>
            <NavBar dp={dpContext} />
            <Link to="PostForm">Add More</Link>
            <div className='downNav' style={postStyle}>
                {postArr.map((e, ind) => <Post key={ind} postDate={e.timeStamp} author={e.author} postDesc={e.descrip} postImage={e.postImage} dp={e.dp} />)}
            </div>
        </div>
    );
}
