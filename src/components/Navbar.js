import * as React from 'react';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { width } from '@mui/system';
import Setting from './Setting.js';
import useState from 'react-hook-use-state';
import { getFirestore } from '@firebase/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SearchFun from "./SearchFun";
import ProfilePage from './ProfilePage'
import { query, orderBy, startAt } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { app, db, storage } from './Firebase';

export default function Navbar() {
    const [name, setname] = useState("");
    const [userDp, setUserDp] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [userUid, setUserUid] = useState("");
    const [userQuery, setUserQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchState, setSearchState] = useState("none");
    const profileRef = collection(db, "profile");
    const userSearch = async (e) => {
        setUserQuery(e.target.value);
        // const q = query(profileRef, orderBy("name"), startAt(userQuery))
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     setSearchResult((val) => [...val, doc.data()]);
        //     console.log(doc.id, " => ", doc.data());
        // });
    }
    // calling userData
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserUid(user.uid)
            getDoc(doc(db, "profile", user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    setname(docSnap.data().name)
                    setUserDp(docSnap.data().dpLink);
                    setphone(docSnap.data().phone)
                    setemail(docSnap.data().email)
                }
            })
        } else {
            // User is signed out
            // ...
        }
    });

    //editing
    const userChange = (e) => {
        setname(e.target.value)
        console.log(name)
    }
    const phoneChange = (e) => {
        setphone(e.target.value)
    }
    const emailChange = (e) => {
        setemail(e.target.value)
    }
    //update on Firebase
    const updateFirebase = () => {
        setDoc(doc(db, 'profile', userUid), {
            name, phone, email
        }).then(() => { alert("Update"); console.log(name, phone, email) })
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    // const userSearch = (e) => {
    //     const q = query(profileRef, orderBy("name"), startAt(userQuery))
    //     getDocs(q)
    //         .then(() => {
    //             // querySnapshot.forEach((doc) => {
    //             //     // doc.data() is never undefined for query doc snapshots
    //             //     setSearchResult(querySnapshot.docs.map((doc) => doc.data()))
    //             querySnapshot.forEach((doc) => {
    //                 // setSearchResult((val) => [...val, doc.data()]);
    //                 setSearchResult((prevdata) => [...prevdata, doc.data()]);
    //             });
    //         });
    // }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        F.R.I.E.N.D.S
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value = {userQuery}
                            placeholder="Search…"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setUserQuery(e.target.value)
                                // userSearch(e);
                            }} />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

