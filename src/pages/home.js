import React, { useEffect } from "react";

import { Link } from 'react-router-dom'


function Home() {
    return (
        <>
            <h1>Choose what level to play at </h1>

            <div className="selection-container">
                <Link to="/game/easy"> <button className="level-selector easy">Easy </button></Link>
                <Link to="/game/medium">  <button className="level-selector medium">Medium</button></Link>
                <Link to="/game/hard"> <button className="level-selector hard">Hard </button></Link>
                <Link to="/highscores"> High scores </Link>
            </div>
        </>
    )
}

export default Home