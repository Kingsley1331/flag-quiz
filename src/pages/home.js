import React, { useState } from "react";

import { Link } from "react-router-dom";
import Highscores from "./highscores";
import Modal from "../components/modal";

function Home() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <h1 className="quiz-header">Flag Quiz</h1>
            <p className="quiz-intro">
                The aim of the game is to match the flags to the correct
                countries before the timer runs out.
            </p>
            <p className="level-selection-text">Choose what level to play at</p>

            <div className="selection-container">
                <Link to="/game/easy">
                    <button className="level-selector easy">Easy </button>
                </Link>
                <Link to="/game/medium">
                    <button className="level-selector medium">Medium</button>
                </Link>
                <Link to="/game/hard">
                    <button className="level-selector hard">Hard </button>
                </Link>
                <p
                    className="high-scores"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    View high scores
                </p>

                {showModal && (
                    <Modal>
                        <Highscores setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default Home;
