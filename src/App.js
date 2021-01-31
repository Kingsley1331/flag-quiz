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
        checkIfpairSelected();
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
        names.forEach((el) => {
            if (el.dataset.set === selections[list]) {
                el.classList.add("selected");
            } else {
                el.classList.remove("selected");
            }
        });
    }

    const checkIfpairSelected = () => {
        const countryNames = Array.from(
            containerRef.current.getElementsByClassName("country")
        );

        const flags = Array.from(
            containerRef.current.getElementsByClassName("flag-div")
        );

        flags.forEach((el, i) => {
            if (el.classList.contains("selected")) {
                // countryNames[i].classList.remove("selected");
                // countryNames[i].classList.add("paired");
            }
        });

        countryNames.forEach((el) => {
            if (el.classList.contains("selected") && selections.selectedFlag) {
                el.classList.add("hide");
                el.classList.remove("selected");
            }
        });
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

//flag background turns blue when paired
//name decouples from flag when paired flag clicked
//everything continues as normal with paired sets ignored
//when everything is paired click submit
//there will be a count down timer
