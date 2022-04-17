import React from "react";

import { useNavigate } from 'react-router-dom'



function Results() {
    const navigate = useNavigate()
    setTimeout(()=>{navigate('/game')},2000)
    return (
        <div>
            Results component
        </div>
    )
}

export default Results