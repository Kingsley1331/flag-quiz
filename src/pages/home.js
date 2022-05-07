import React, { useEffect } from "react";

import { Link } from 'react-router-dom'






function Home() {
    
// useEffect(() => {
//     window.location.reload()
// },[])

    return (
        <>
            <h1>Choose what level to play at </h1>

            <div className="selection-container">
                <button className="level-selector easy"> <Link to="/game/easy">Easy</Link> </button>
                <button className="level-selector medium"> <Link to="/game/medium">medium</Link> </button>
                <button className="level-selector hard"> <Link to="/game/hard">hard</Link> </button>
            </div>
        </>
    )
}

export default Home