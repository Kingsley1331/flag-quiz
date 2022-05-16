//began on 04/10/2020
import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import "./App.scss";
import "./level-selection.scss";
import "./modal.scss";

import Home from './pages/home';
import Game from './pages/game';
import HighScores from './pages/highscores';




if( !localStorage['easyLevelHighScore'] ){
    localStorage['easyLevelHighScore'] = 0;
}


if( !localStorage['mediumLevelHighScore']){
    localStorage['mediumLevelHighScore'] = 0;
}

if(!localStorage['hardLevelHighScore']){
    localStorage['hardLevelHighScore'] = 0;
}



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:level" element={<Game />} /> 
            </Routes>
        </Router>
    )
}

export default App;
