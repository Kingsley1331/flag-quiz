import React, { useState, useEffect } from "react";

import {
    pairingsManager,
    addToPairings,
    addPairedName,
    unPairName,
} from "./utility";

const Flags = (props) => {
    let { countryInfo, dispatch, gameState } = props;

    const [flagIndex, setFlagIndex] = useState(null);

    useEffect(() => {
        doWeHavePairing();
    }, [gameState]);

    function doWeHavePairing() {
        const countryNameDetails = isNameSelected();

        if (isNameSelected().check && isFlagSelected()) {
            console.log("flagIndex", isNameSelected());

            dispatch({
                type: "choose-flag",
                flag: {
                    [flagIndex.index]: {
                        country: flagIndex.name,
                        status: "paired",
                    },
                    index: flagIndex.index,
                },
            });

            addToPairings({
                name: {
                    name: countryNameDetails.name,
                    index: countryNameDetails.index,
                },
                flag: flagIndex.name,
            });

            dispatch({
                type: "choose-country",
                country: {
                    [countryNameDetails.index]: {
                        country: countryNameDetails.name,
                        status: "paired",
                    },
                    index: countryNameDetails.index,
                },
            });
        }
    }

    function isFlagSelected() {
        let index;
        for (index in gameState.flags) {
            let status = gameState.flags[index].status;
            if (status === "selected") {
                return true;
            }
        }
        return false;
    }

    function isNameSelected() {
        let index;
        for (index in gameState.countries) {
            let status = gameState.countries[index].status;
            let name = gameState.countries[index].country;
            if (status === "selected") {
                return { check: true, index, name };
            }
        }
        return { check: false };
    }

    function stateResetter() {
        console.log("gameState", gameState);
        countryInfo.map((country, index) => {
            if (gameState.flags[index].status === "selected") {
                dispatch({
                    type: "choose-flag",
                    flag: {
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
                    <div key={country.name}>
                        <div
                            className="flag-div"
                            onClick={() => {
                                stateResetter();

                                dispatch({
                                    type: "choose-flag",
                                    flag: {
                                        [index]: {
                                            country: country.name,
                                            status:
                                                gameState.flags[index]
                                                    .status === "selected" ||
                                                gameState.flags[index]
                                                    .status === "paired"
                                                    ? "unselected"
                                                    : "selected",
                                        },
                                        index,
                                    },
                                });
                                setFlagIndex({ index, name: country.name });

                                unPairName(
                                    gameState,
                                    index,
                                    dispatch,
                                    country.name
                                );

                                pairingsManager(
                                    gameState,
                                    index,
                                    country.name,
                                    "flag"
                                );
                            }}
                            data-set={country.name}
                        >
                            <img
                                className="flag"
                                alt="flag-pic"
                                src={country.flag}
                            />
                        </div>
                        <div className="chosenCountry">
                            {addPairedName(country.name)}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Flags;
