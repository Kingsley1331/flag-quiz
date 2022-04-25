import React from "react";

import { useNavigate, useParams, Link } from 'react-router-dom'



function Results() {
    const { difficulty } = useParams()
    const totalPoints = localStorage[`${difficulty}TotalPoints`]

    return (
        <div>
            {`You scored ${totalPoints} points`}
            <Link to="/"> Play again</Link>
        </div>
    )
}

export default Results