import React from "react";
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="not-found">
            <h3>Oops! You seem to be lost.</h3>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            <Link to='/tools'>Tools</Link>
            <Link to='/promos'>Contact</Link>
        </div>
    )
}