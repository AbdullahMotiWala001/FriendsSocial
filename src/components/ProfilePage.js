// import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Button from '@mui/material/Button';
// import useState from 'react-hook-use-state';
// // import { useRef } from 'react';
// import { db } from './Firebase';
// import { doc, updateDoc, onSnapshot } from "firebase/firestore";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
// import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// export default function ProfilePage() {
//     const navigate = useNavigate()
//     const auth = getAuth()
//     //myFun
//     // const navigate = useNavigate();
//     const [uid, setUID] = useState("");
//     // const [postDiv, setPostDiv] = useState(false);
//     // const [userDiv, setUserDiv] = useState(false);
//     // const [post, setPost] = useState([]);
//     const [userInfo, setUserInfo] = useState({});
//     // const [caption, setCaption] = useState("");
//     // const files = useRef("");
//     // const upFile = useRef("");
//     const [changeName, setChangeName] = useState(false);
//     // const [changeLastName, setChangeLastName] = useState(false);
//     const [changeEmail, setChangeEmail] = useState(false);
//     // const [changeGender, setChangeGender] = useState(false);
//     const [changeNameVal, setChangeNameVal] = useState("");
//     // const [changeLastNameval, setChangeLastNameval] = useState("");
//     // const [changeGenderVal, setChangeGenderVal] = useState("");
//     const [changeEmailVal, setChangeEmailVal] = useState("");
//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 const uid = user.uid;
//                 setUID(uid);
//                 //// Getting User Info
//                 onSnapshot(doc(db, "profile", uid), (doc) => {
//                     setUserInfo(doc.data());
//                 });
//             } else {
//                 navigate("/login");
//             }
//         });
//     });
//     const edit = (val) => {
//         if (!changeName) {
//             return (
//                 <>
//                     <span className="span">{val}</span>
//                     <EditRoundedIcon
//                         onClick={editBtn}
//                         style={{ marginLeft: "10px", fontSize: "20px" }}
//                     />
//                 </>
//             );
//         } else if (changeName) {
//             return (
//                 <>
//                     <input
//                         type="text"
//                         className="edit"
//                         onChange={(e) => {
//                             setChangeNameVal(e.target.value);
//                         }}
//                     />
//                     <ChangeCircleRoundedIcon
//                     />
//                     <button
//                         id="name"
//                         onClick={(e) => {
//                             updateProvidedData(e, changeNameVal);
//                             setChangeName(!changeName);
//                         }}>Update</button>
//                 </>
//             );
//         }
//     };
//     const editEmail = (val) => {
//         if (!changeEmail) {
//             return (
//                 <>
//                     <span>{val}</span>
//                     <EditRoundedIcon
//                         onClick={editBtnEmail}
//                         style={{ marginLeft: "10px", fontSize: "20px" }}
//                     />
//                 </>
//             );
//         } else if (changeEmail) {
//             return (
//                 <>
//                     <input
//                         type="email"
//                         className="edit"
//                         onChange={(e) => {
//                             setChangeEmailVal(e.target.value);
//                         }}
//                     />
//                     <ChangeCircleRoundedIcon />
//                     <button
//                         id="email"
//                         onClick={(e) => {
//                             editUserEmail(e, changeEmailVal);
//                             setChangeEmail(!changeEmail);
//                             console.log(changeEmailVal)
//                         }}
//                     >Update</button>
//                 </>
//             );
//         }
//     };
//     const editUserEmail = (e, val) => {
//         updateEmail(auth.currentUser, val).then(() => {
//             alert("GO & CHECK")
//         }).catch((error) => {
//             alert("Please Write Correct Email To Change")
//         });
//     };
//     const editBtn = () => {
//         setChangeName(true);
//     };
//     // const editBtnName = () => {
//     //     setChangeLastName(true);
//     // };

//     const editBtnEmail = () => {
//         setChangeEmail(true);
//     };

//     // const editBtnGender = () => {
//     //     setChangeGender(true);
//     // };

//     const updateProvidedData = (e, val) => {
//         if (val.length >= 2 && val !== userInfo[e.target.id]) {
//             const updateRef = doc(db, "profile", uid);
//             updateDoc(updateRef, {
//                 [e.target.id]: val,
//             });
//         }
//     };

//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     return (
//         <div>
//             <Button aria-describedby={id} variant="contained" onClick={handleClick}>
//                 Profile
//             </Button>
//             <Popover

//                 anchorReference="anchorPosition"
//                 anchorPosition={{ top: 200, left: 400 }}
//                 // anchorOrigin={{
//                 //     vertical: 'top',
//                 //     horizontal: 'left',
//                 // }}
//                 transformOrigin={{
//                     vertical: 'center',
//                     horizontal: 'left',
//                 }}
//                 id={id}
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'left',
//                 }}
//             >
//                 <div className="user">
//                     <p>Name : {edit(userInfo.name)}</p>
//                     <p>Email : {editEmail(userInfo.email)} </p>
//                 </div>
//                 {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
//             </Popover>

//         </div>
//     );
// }


import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}