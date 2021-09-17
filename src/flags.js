import React, { useState, useEffect } from "react";

import {
    pairingsManager,
    addToPairings,
    addPairedName,
    unPairName,
    dispatcher,
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

            dispatcher(
                dispatch,
                "choose-flag",
                "paired",
                flagIndex.index,
                flagIndex.name,
                "flag"
            );

            addToPairings({
                name: {
                    name: countryNameDetails.name,
                    index: countryNameDetails.index,
                },
                flag: flagIndex.name,
            });

            dispatcher(
                dispatch,
                "choose-country",
                "paired",
                countryNameDetails.index,
                countryNameDetails.name,
                "country"
            );
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
                dispatcher(
                    dispatch,
                    "choose-flag",
                    "unselected",
                    index,
                    country.name,
                    "flag"
                );
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
