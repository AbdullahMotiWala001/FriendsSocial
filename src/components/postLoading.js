import React from 'react'
import loading from './postloading.gif'

export default function PostLoading() {
    return (
        <div >
            <img src={loading} alt='loading' style={{ width: '50vw', height: '50vh', zIndex: 10 }} />
        </div>
    )
}