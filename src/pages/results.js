import React from "react";

import { useParams, Link } from 'react-router-dom';


function Results() {
    const { difficulty } = useParams()
    const totalPoints = parseInt(localStorage[`${difficulty}TotalPoints`])

    let easyLevelHighScore = parseInt(localStorage['easyLevelHighScore'])
    let mediumLevelHighScore = parseInt(localStorage['mediumLevelHighScore'])
    let hardLevelHighScore = parseInt(localStorage['hardLevelHighScore'])

    let newHighScore = false;

    if (difficulty === "easy") {
        if (easyLevelHighScore < totalPoints) {
            if (easyLevelHighScore > 0) {
                newHighScore = true;
            }
            easyLevelHighScore = localStorage['easyLevelHighScore'] = totalPoints;

        }
    } else if (difficulty === "medium") {
        if (mediumLevelHighScore < totalPoints) {
            if (mediumLevelHighScore > 0) {
                newHighScore = true;
            }
            mediumLevelHighScore = localStorage['mediumLevelHighScore'] = totalPoints;
           
        }
    } else {
        if (hardLevelHighScore < totalPoints) {
            if (mediumLevelHighScore > 0) {
                newHighScore = true;
            }
            hardLevelHighScore = localStorage['hardLevelHighScore'] = totalPoints;           
        }
    }

    const scoreMessage = newHighScore ? `New highscore of ${totalPoints}` : `You scored ${totalPoints} points`

    return (
        <div>
            {scoreMessage}
            <h2>High Scores</h2>
            <p> {`You highest sore at the easy Level is ${easyLevelHighScore}`} </p>
            <p> {`You highest sore at the medium Level is ${mediumLevelHighScore}`} </p>
            <p> {`You highest sore at the hard Level is ${hardLevelHighScore}`} </p>
            <Link to="/"> Play again</Link>
        </div>
    )
}

export default Results