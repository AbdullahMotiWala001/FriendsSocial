import { useParams } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { db } from "./Firebase";
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { UserDetails } from './infoLoading';
import { onSnapshot, getDocs } from "firebase/firestore";
import Post from './Post';
import PostLoading from './postLoading'

const drawerWidth = 270;



export default function SearchedUser(props) {

    const [userState, setUserState] = useState({})
    const [dataFet, setDataFet] = useState(false);
    const [personalPost, setPersonalPost] = useState([]);
    const { uid } = useParams();
    //fetching Data

    useEffect(() => {
        // const q = query(
        //     collection(db, 'posts'),
        //     where('author' === "sadfsdf")
        // )
        (async () => {
            console.log('firebaseQ');
            const q = query(
                collection(db, "posts"),
                where("author", "==", 'sadfsdf'),
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setPersonalPost((val) => [...val, doc.data()]);
            });
        }
        )()
    }, [uid])


    useEffect(() => {
        const docRef = doc(db, "profile", uid);
        getDoc(docRef,).then((doc) => {
            setUserState({ ...doc.data() })
            setDataFet(true)
        });
    }, [uid])
    const paperStyle = {
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const iconCondition = (ind) => {
        switch (ind) {
            case 0:
                return <PersonOutlineRoundedIcon />;
            case 1:
                return <EmailRoundedIcon />;
            case 2:
                return <PhoneEnabledRoundedIcon />
            default:
                break;
        }
    }
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List sx={{ height: 150 }}>
                {
                    dataFet ?
                        (
                            [userState.name, userState.email, userState.phone].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                    <ListItemIcon>
                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        {iconCondition(index)}
                                    </ListItemIcon>
                                </ListItem>
                            ))
                        ) :
                        <UserDetails />
                }
            </List>
            <Divider />
            <Typography>Soon to be added more ... <MoreTimeOutlinedIcon /></Typography>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" >
                            <p align='center'> F.R.I.E.N.D.S</p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .Muidrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>

                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .Muidrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Paper style={paperStyle}>
                        <Avatar sx={{ width: 100, height: 100, margin: 5, border: '2px solid #1976d2' }} src={userState.dpLink}></Avatar>
                    </Paper>
                </Box>
            </Box>
            {
            dataFet ?
                (personalPost.map((e, ind) => <Post key={ind} postDate={e.timeStamp} author={e.author} postDesc={e.descrip} postImage={e.postImage} dp={e.dpLink} />)) :
                < PostLoading />
            }
        </>
    );
}

// ResponsiveDrawer.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func,
// };


