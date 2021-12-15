import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import SearchShowing from './SearchShowing';
import useState from 'react-hook-use-state';
import { query, orderBy, startAt } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { app, db, storage } from './Firebase';
import { useEffect } from 'react';
import { useMemo } from 'react';





export default function SearchFun() {
    console.log("pak")
    const [userQuery, setUserQuery] = useState("");
    const [searchResult, setSearchedResult] = ([]);
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
        const q = query(profileRef, orderBy("name"), startAt(userQuery))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setSearchedResult(querySnapshot.docs.map((doc) => doc.data()))
        });
    }
    return (
        <div>
            {/* <Search>
                <SearchIconWrapper style={{ cursor: 'pointer' }}>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    value={userQuery}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={userSearch}
                />
            </Search> 
            */}
            {/* <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    value={userQuery}
                    onChange={(e) => {
                        setUserQuery(e.target.value);
                        console.log(e.target.value);
                        setSearchedResult([])
                        // searchResult(inputSearch, setSearchedResult, searchedResult);
                    }}

                    inputProps={{ "aria-label": "search" }}
                />
            </Search> */}
            {/* {searchState == 'showLoad' && <Loading />} */}

        </div>
    )
}