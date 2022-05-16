import React from "react";
import { useParams, Link } from 'react-router-dom';


function Results(props) {
    const highScores = {
        easy: parseInt(localStorage['easyLevelHighScore']),
        medium: parseInt(localStorage['mediumLevelHighScore']),
        hard: parseInt(localStorage['hardLevelHighScore'])
    }
    const { setShowModal } = props;
    return (
        <div>
            <h2>High Scores</h2>
            <p> {`Easy: ${highScores.easy}`} </p>
            <p> {`Medium: ${highScores.medium}`} </p>
            <p> {`Hard: ${highScores.hard}`} </p>
            <Link to="/" onClick={() => { setShowModal(false) }}> Close</Link>
        </div>
    )
}

export default Results