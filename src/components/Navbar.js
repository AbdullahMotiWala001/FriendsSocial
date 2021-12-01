import React from 'react'
import {Link}  from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <Link to='./login'>Sign In </Link>
            <Link to='./signup'>Sign Up </Link>
        </div>
    )
}
