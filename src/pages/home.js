import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Link to="/game/easy">Easy</Link>  
            <Link to="/game/medium">medium</Link>  
            <Link to="/game/hard">hard</Link>        
        </div>
    )
}

export default Home