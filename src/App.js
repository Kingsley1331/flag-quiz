//began on 04/10/2020
//add coundown timer for each question
import React, { useState, useEffect, useReducer, useRef } from "react";

import Names from "./names";
import Flags from "./flags";
import "./App.css";

function reducer(state, action) {
    const index = action.flags ? action.flags.index : action.countries.index;

    switch (action.type) {
        case "choose-flag":
            return {
                ...state,
                flags: {
                    ...state.flags,
                    [index]: {
                        country: action.flags[index].country,
                        status: action.flags[index].status,
                    },
                },
            };

        case "choose-country":
            return {
                ...state,
                countries: {
                    ...state.countries,
                    [index]: {
                        country: action.countries[index].country,
                        status: action.countries[index].status,
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
        countries: {
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

    const [countries, setCountries] = useState([{ name: "", flag: "" }]);

    console.log("countries", countries);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "https://restcountries.eu/rest/v2/all"
            );
            let data = await response.json();
            data = data.slice(0, 5);

            setCountries(nameFlagData(data));
        }
        fetchData();
    }, []);

    useEffect(() => {
        // highlightSelection();
        // checkSelections();
    }, [selections]);

    const containerRef = useRef();

    console.log("selections", selections);

    // containerRef.current.getElementsByClassName("country")
    // containerRef.current.getElementsByClassName("flag-div")

    return (
        <>
            <h1 className="App-header">Flag Quiz</h1>
            flag {selections.selectedFlag} <br />
            country {selections.selectedCountry} <br />
            <div ref={containerRef} className="main-container">
                <div className="country-name-container">
                    <Names
                        dispatch={dispatch}
                        countryInfo={countries}
                        // highlightSelection={highlightSelection}
                        selectedCountry={selections.countries}
                    />
                </div>
                <div className="flag-container">
                    <Flags
                        dispatch={dispatch}
                        countryInfo={countries}
                        // highlightSelection={highlightSelection}
                        selectedCountry={selections.selectedCountry}
                        selectedFlag={selections.flags}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
