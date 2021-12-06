import React from 'react';
import Navbar from './Navbar';
import {Link} from "react-router-dom"

export default function Home() {
    return (
        <div>
            <Navbar />

            <h1>Posts</h1>
            <Link to="PostForm">Add More</Link>
        </div>
    )
}
