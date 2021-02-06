//began on 04/10/2020
//add coundown timer for each question
import React, { useState, useEffect, useReducer, useRef } from "react";
import { fetchData } from "./fetchData";
import Names from "./names";
import Flags from "./flags";
import "./App.css";

function reducer(state, action) {
    switch (action.type) {
        case "choose-flag":
            return { ...state, selectedFlag: action.selectedFlag };
        case "choose-country":
            return { ...state, selectedCountry: action.selectedCountry };
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
        selectedFlag: "",
        selectedCountry: "",
    });

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
        names.forEach((name) => {
            if (name.dataset.set === selections[list]) {
                name.classList.add("selected");
            } else {
                name.classList.remove("selected");
            }
        });
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
                        selectedCountry={selections.selectedCountry}
                    />
                </div>
                <div className="flag-container">
                    <Flags
                        dispatch={dispatch}
                        countryInfo={countries}
                        highlightSelection={highlightSelection}
                        selectedCountry={selections.selectedCountry}
                        selectedFlag={selections.selectedFlag}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
