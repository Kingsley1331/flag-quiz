import React from "react";
import { useParams, Link } from 'react-router-dom';


function Results() {
    const { difficulty } = useParams()
    const totalPoints = parseInt(localStorage[`${difficulty}TotalPoints`])

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


    if (difficulty === "easy") {
        HighScoreUpdate(highScores.easy, "easyLevelHighScore", "easy")
    } else if (difficulty === "medium") {
        HighScoreUpdate(highScores.medium, "mediumLevelHighScore", "medium")
    } else {
        HighScoreUpdate(highScores.hard, "hardLevelHighScore", "hard")
    }

    const scoreMessage = newHighScore ? `New highscore of ${totalPoints}` : `You scored ${totalPoints} points`

    return (
        <div>
            {scoreMessage}
            <h2>High Scores</h2>
            <p> {`You highest score at the easy Level is ${highScores.easy}`} </p>
            <p> {`You highest score at the medium Level is ${highScores.medium}`} </p>
            <p> {`You highest score at the hard Level is ${highScores.hard}`} </p>
            <Link to="/"> Play again</Link>
        </div>
    )
}

export default Results