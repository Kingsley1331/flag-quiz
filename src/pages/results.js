import React from "react";

import { useNavigate, useParams } from 'react-router-dom'



function Results() {
    const navigate = useNavigate()
    const {level} = useParams()
    // setTimeout(()=>{navigate('/game')},2000)
    return (
        <div>
            {level}
            Results component
        </div>
    )
}

export default Results