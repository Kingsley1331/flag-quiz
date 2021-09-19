//began on 04/10/2020
import React, { useState, useEffect, useReducer, useRef } from "react";

import Names from "./names";
import Flags from "./flags";
import "./App.scss";

import {
    highlightSelection,
    arrayOfSelectedCountries,
    pairings,
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
    }, []);

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

    // console.log("countries", selections.names);
    // console.log("flags", selections.flags);

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
            </div>
            <button
                type="submit"
                onClick={() => {
                    console.log("test pairings", pairings);
                }}
            >
                {" "}
                Submit answers
            </button>
        </>
    );
};

export default App;
