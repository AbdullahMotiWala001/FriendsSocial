import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchShowing from './SearchShowing';
import useState from 'react-hook-use-state';
import Loading from './Loading';
import { query, orderBy, startAt } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { app, db, storage } from './Firebase';





export default function SearchFun() {
    const [userQuery, setUserQuery] = useState("")
    const [searchState, setSearchState] = useState("none");
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
    const profileRef = collection(db, "profile");
    const userSearch = async (e) => {
        setUserQuery(e.target.value)
        const q = query(profileRef, orderBy("name"), startAt(userQuery))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }
    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    value={userQuery}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={userSearch}
                    onFocus={() => {
                        setSearchState('showLoad'); console.log("pak")
                    }}
                    onMouseOut={() => {
                        setSearchState('none')
                    }}
                />
            </Search>
            {searchState == 'showLoad' && <Loading />}

        </div>
    )
}