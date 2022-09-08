//began on 04/10/2020
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/App.scss";
import "./css/level-selection.scss";
import "./css/modal.scss";

import Home from "./pages/home";
import Game from "./pages/game/game";

/** To avoid repitition turn these if blocks into a function that takes the level
  * maybe you can replace the if blocks with a function call, or find away to update 
  * them in one go
 */

if (!localStorage["easyLevelHighScore"]) {
    localStorage["easyLevelHighScore"] = 0;
}

if (!localStorage["mediumLevelHighScore"]) {
    localStorage["mediumLevelHighScore"] = 0;
}

if (!localStorage["hardLevelHighScore"]) {
    localStorage["hardLevelHighScore"] = 0;
}

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:level" element={<Game />} />
            </Routes>
        </Router>
    );
};

export default App;
