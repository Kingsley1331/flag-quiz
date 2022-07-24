import React, { useState } from "react";

import { Link } from "react-router-dom";
import Highscores from "./highscores";
import Modal from "../components/modal";

function Home() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <h1>Choose what level to play at </h1>

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
                    High scores
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
