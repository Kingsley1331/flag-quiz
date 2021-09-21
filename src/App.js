//began on 04/10/2020
import React, { useState, useEffect, useReducer, useRef } from "react";

import Names from "./names";
import Flags from "./flags";
import "./App.scss";

import {
    highlightSelection,
    arrayOfSelectedCountries,
    pairings,
    stateResetter,
} from "./utility";

function reducer(state, action) {
    const index = action.flag ? action.flag.index : action.name.index;

    switch (action.type) {
        case "choose-flag":
            return {
                ...state,
                flags: {
                    ...state.flags,
                    [index]: {
                        country: action.flag[index].country,
                        status: action.flag[index].status,
                    },
                },
            };

        case "choose-name":
            return {
                ...state,
                names: {
                    ...state.names,
                    [index]: {
                        country: action.name[index].country,
                        status: action.name[index].status,
                    },
                },
            };
        default:
            return state;
    }
}

function nameFlagData(countryData) {
    const filteredData = countryData.map((country) => {
        return { name: country.name, flag: country.flag };
    });

    return filteredData;
}

const App = () => {
    const [selections, dispatch] = useReducer(reducer, {
        names: {
            0: { country: "", status: "unselected" },
            1: { country: "", status: "unselected" },
            2: { country: "", status: "unselected" },
            3: { country: "", status: "unselected" },
            4: { country: "", status: "unselected" },
        },
        flags: {
            0: { country: "", status: "unselected" },
            1: { country: "", status: "unselected" },
            2: { country: "", status: "unselected" },
            3: { country: "", status: "unselected" },
            4: { country: "", status: "unselected" },
        },
    });

    const [countriesFromApi, setCountries] = useState([{ name: "", flag: "" }]);

    const [questionNumber, setQuestionNumber] = useState(1);

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "https://restcountries.eu/rest/v2/all"
            );
            const data = await response.json();
            let randomlySelectedCountries = arrayOfSelectedCountries(data);

            setCountries(nameFlagData(randomlySelectedCountries));
        }
        fetchData();
    }, [questionNumber]);

    const containerRef = useRef();
    useEffect(() => {
        highlightSelection(
            containerRef,
            selections,
            "flags",
            "flag-div",
            "paired"
        );
        highlightSelection(
            containerRef,
            selections,
            "names",
            "country",
            "hide"
        );
    }, [selections]);

    useEffect(() => {
        countDownTimer();
    }, []);

    // console.log("countries", selections.names);
    // console.log("flags", selections.flags);

    let totalPoints = 0;
    const addPoints = () => {
        // console.log("test pairings", pairings);
        let points = 0;

        pairings.forEach((pair) => {
            if (pair.flag === pair.name.name) {
                points++;
            }
            return points;
        });

        totalPoints = +points;
        console.log("sumOfPoints", totalPoints);

        if (questionNumber < 10) {
            setQuestionNumber(questionNumber + 1);
        }

        stateResetter(
            countriesFromApi,
            selections,
            dispatch,
            "choose-name",
            "name"
        );

        stateResetter(
            countriesFromApi,
            selections,
            dispatch,
            "choose-flag",
            "flag"
        );
    };

    // const countDownTimer = () => {
    function countDownTimer() {
        setInterval(() => {
            // timer++;
            debugger;
            setTimer(timer + 1);
            console.log(timer);
        }, 1000);
    }

    return (
        <>
            <h1 className="App-header">Flag Quiz</h1>
            <div ref={containerRef} className="main-container">
                <div className="country-name-container">
                    <Names
                        dispatch={dispatch}
                        countryInfo={countriesFromApi}
                        gameState={selections}
                    />
                </div>
                <div className="flag-container">
                    <Flags
                        dispatch={dispatch}
                        countryInfo={countriesFromApi}
                        gameState={selections}
                    />
                </div>
                <button type="submit" onClick={addPoints}>
                    Submit answers
                </button>
            </div>
            <p>{questionNumber}</p>
            <p>{timer}</p>
        </>
    );
};

export default App;
