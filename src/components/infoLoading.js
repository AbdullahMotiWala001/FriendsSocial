import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


export function UserDetails() {
    return (
        <>
            <Box height={150}>
                <Skeleton height={50} />
                <Skeleton animation="wave" height={50} />
                <Skeleton animation={false} height={50} />
            </Box>
        </>
    )
}

