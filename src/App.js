//began on 04/10/2020
import React, {
    useState,
    useEffect,
    useReducer,
    useRef,
    useCallback,
} from "react";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import "./App.scss";

import Home from './pages/home'
import Game from './pages/game'
import Results from './pages/results'


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:difficulty" element={<Game />} />
                <Route path="/results/:level" element={<Results />} />
            </Routes>
        </Router>
    )
}

export default App;
