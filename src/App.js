//began on 04/10/2020
//add coundown timer for each question
import React, { useState, useEffect, useReducer, useRef } from "react";
import { fetchData } from "./fetchData";
import Names from "./names";
import Flags from "./flags";
import "./App.css";

function reducer(state, action) {
    // debugger;
    const index = action.flags ? action.flags.index : action.countries.index;

    // const index = action.countries.index;
    switch (action.type) {
        case "choose-flag":
            //return { ...state, selectedFlag: action.selectedFlag };

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

// flags: {
//     country: country.name,
//     status: selected,
//     index: index,
// },

function nameFlagData(countryData) {
    const filteredData = countryData.map((country) => {
        return { name: country.name, flag: country.flag };
    });

    return filteredData;
}

const App = () => {
    // const [selections, dispatch] = useReducer(reducer, {
    //     selectedFlag: "",
    //     selectedCountry: "",
    // });

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

    console.log("selections", selections);
    const gamesState = {
        countries: [
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
        ],
        flags: [
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
            { country: "", status: "unselected" },
        ],
    };

    const [optionState, setOptionState] = useState("unselected");

    const [countries, setCountries] = useState([{ name: "", flag: "" }]);

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
        highlightSelection();
        checkSelections();
    }, [selections]);

    const containerRef = useRef();

    function highlightSelection() {
        const countryNames = Array.from(
            containerRef.current.getElementsByClassName("country")
        );

        const flags = Array.from(
            containerRef.current.getElementsByClassName("flag-div")
        );

        manageSelections(flags, "selectedFlag");
        manageSelections(countryNames, "selectedCountry");
    }

    function manageSelections(names, list) {
        if (names === "country") {
            var statusObject = gamesState.countries;
        } else {
            var statusObject = gamesState.flags;
        }

        names.forEach((name, i) => {
            if (
                name.dataset.set === selections[list] &&
                name.dataset.set !== ""
            ) {
                // debugger;
                name.classList.add("selected");
                //   setOptionState("selected");
                if (list === "selectedCountry") {
                    gamesState.countries[i] = "selected";
                } else {
                    gamesState.flags[i] = "selected";
                }
            } else {
                name.classList.remove("selected");
                //   setOptionState("unselected");
                if (list === "selectedCountry") {
                    gamesState.countries[i] = "unselected";
                } else {
                    gamesState.flags[i] = "unselected";
                }
            }
        });

        // console.log("gamesState", gamesState);
    }

    const checkSelections = () => {
        const countryNames = Array.from(
            containerRef.current.getElementsByClassName("country")
        );

        const flags = Array.from(
            containerRef.current.getElementsByClassName("flag-div")
        );

        checkIfCountryNameSelected(countryNames);
        checkIfPaired(flags);
    };

    const checkIfCountryNameSelected = (countryNames) => {
        countryNames.forEach((countryName) => {
            if (
                countryName.classList.contains("selected") &&
                selections.selectedFlag
            ) {
                countryName.classList.add("hide");
                countryName.classList.remove("selected");
            } else if (!selections.selectedFlag) {
                countryName.classList.remove("hide");
            }
        });
    };

    const checkIfPaired = (flags) => {
        if (selections.selectedCountry && selections.selectedFlag) {
            flags.forEach((flag, i) => {
                if (flag.classList.contains("selected")) {
                    flag.classList.remove("selected");
                    flag.classList.add("paired");
                }
            });
        } else {
            flags.forEach((flag, i) => {
                if (flag.classList.contains("paired")) {
                    flag.classList.remove("paired");
                }
            });
        }
    };

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
                        highlightSelection={highlightSelection}
                        selectedCountry={selections.countries}
                    />
                </div>
                <div className="flag-container">
                    <Flags
                        dispatch={dispatch}
                        countryInfo={countries}
                        highlightSelection={highlightSelection}
                        selectedCountry={selections.selectedCountry}
                        selectedFlag={selections.flags}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
