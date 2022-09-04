import React from "react";
import { Link } from "react-router-dom";

function Results(props) {
    const highScores = {
        easy: parseInt(localStorage["easyLevelHighScore"]),
        medium: parseInt(localStorage["mediumLevelHighScore"]),
        hard: parseInt(localStorage["hardLevelHighScore"]),
    };
    const { setShowModal } = props;
    return (
        <div className="modal-div">
            <h2>High Scores</h2>
            <p> {`Easy: ${highScores.easy}/50`} </p>
            <p> {`Medium: ${highScores.medium}/60`} </p>
            <p> {`Hard: ${highScores.hard}/70`} </p>
            <Link
                to="/"
                onClick={() => {
                    setShowModal(false);
                }}
            >
                Close
            </Link>
        </div>
    );
}

export default Results;
