import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
    return (
        <div>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </div>
    )
}
