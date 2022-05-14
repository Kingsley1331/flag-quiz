import React from "react";
import { useParams, Link } from 'react-router-dom';


function Results() {
    // const { difficulty } = useParams()
    // const totalPoints = parseInt(localStorage[`${difficulty}TotalPoints`])

    const highScores = {
        easy: parseInt(localStorage['easyLevelHighScore']),
        medium: parseInt(localStorage['mediumLevelHighScore']),
        hard: parseInt(localStorage['hardLevelHighScore'])
    }

    // let newHighScore = false;

    // function HighScoreUpdate(highScore, highScoreStorage, level) {
    //     if (highScore < totalPoints) {
    //         if (highScore > 0) {
    //             newHighScore = true;
    //         }
    //         highScores[level] = localStorage[highScoreStorage] = totalPoints;
    //     }
    // }


    // if (difficulty === "easy") {
    //     HighScoreUpdate(highScores.easy, "easyLevelHighScore", "easy")
    // } else if (difficulty === "medium") {
    //     HighScoreUpdate(highScores.medium, "mediumLevelHighScore", "medium")
    // } else {
    //     HighScoreUpdate(highScores.hard, "hardLevelHighScore", "hard")
    // }

    // const scoreMessage = newHighScore ? `New highscore of ${totalPoints}` : `You scored ${totalPoints} points`

    return (
        <div>
            <h2>High Scores</h2>
            <p> {`Easy: ${highScores.easy}`} </p>
            <p> {`Medium: ${highScores.medium}`} </p>
            <p> {`Hard: ${highScores.hard}`} </p>
            <Link to="/"> Return to home page</Link>
        </div>
    )
}

export default Results