import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Link to="/game">Game</Link>        
        </div>
    )
}

export default Home