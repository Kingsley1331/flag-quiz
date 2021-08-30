import React, { useState, useEffect } from "react";
import { pairingsManager } from "./utility";

const Names = (props) => {
    const {
        countryInfo,
        dispatch,
        highlightSelection,
        selectedCountry,
        gameState,
    } = props;

    useEffect(() => {}, [gameState]);

    function isFlagSelected() {
        let flag;
        for (flag in gameState.flags) {
            let status = gameState.flags[flag].status;
            if (status === "selected") {
                return true;
            }
        }
        return false;
    }

    function isNameSelected() {
        let name;
        for (name in gameState.countries) {
            let status = gameState.countries[name].status;
            if (status === "selected") {
                return true;
            }
        }
        return false;
    }

    function stateResetter() {
        countryInfo.map((country, index) => {
            if (gameState.countries[index].status === "selected") {
                dispatch({
                    type: "choose-country",
                    country: {
                        [index]: {
                            country: country.name,
                            status: "unselected",
                        },
                        index,
                    },
                });
            }
        });
    }

    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <p
                        className="country"
                        onClick={(event) => {
                            stateResetter();
                            dispatch({
                                type: "choose-country",
                                country: {
                                    [index]: {
                                        country: country.name,
                                        status:
                                            gameState.countries[index]
                                                .status === "selected" ||
                                            gameState.countries[index]
                                                .status === "paired"
                                                ? "unselected"
                                                : "selected",
                                    },
                                    index,
                                },
                            });
                        }}
                        key={country.name}
                        data-set={country.name}
                    >
                        {country.name}
                    </p>
                );
            })}
        </>
    );
};

export default Names;
