import React from "react";
import { useParams, Link } from 'react-router-dom';


function Results() {
    const { level } = useParams()
    const totalPoints = parseInt(localStorage[`${level}TotalPoints`])

    const highScores = {
        easy: parseInt(localStorage['easyLevelHighScore']),
        medium: parseInt(localStorage['mediumLevelHighScore']),
        hard: parseInt(localStorage['hardLevelHighScore'])
    }

    let newHighScore = false;

    function HighScoreUpdate(highScore, highScoreStorage, level) {
        if (highScore < totalPoints) {
            if (highScore > 0) {
                newHighScore = true;
            }
            highScores[level] = localStorage[highScoreStorage] = totalPoints;
        }
    }


    if (level === "easy") {
        HighScoreUpdate(highScores.easy, "easyLevelHighScore", "easy")
    } else if (level === "medium") {
        HighScoreUpdate(highScores.medium, "mediumLevelHighScore", "medium")
    } else {
        HighScoreUpdate(highScores.hard, "hardLevelHighScore", "hard")
    }

    const scoreMessage = newHighScore ? `Well done!  new highscore of ${totalPoints}` : `You scored ${totalPoints} points`

    return (
        <div>
            <h2>{scoreMessage}! </h2>           
            <p><Link to="/"> Play again</Link></p>
        </div>
    )
}

export default Results