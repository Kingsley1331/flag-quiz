import React, { useState, useEffect } from "react";

import {
    pairingsManager,
    addPairedName,
    unPairName,
    dispatcher,
    stateResetter,
    doWeHavePairing,
} from "./utility";

import tick from "./assets/tick.svg";
import cross from "./assets/cross.svg";

const Flags = (props) => {
    let { countryInfo, dispatch, gameState, flagOrder, freezeCountries } =
        props;

    console.log("freezeCountries", freezeCountries);

    const [flagIndex, setFlagIndex] = useState(null);

    useEffect(() => {
        doWeHavePairing(gameState, flagIndex, dispatch);
    }, [gameState]);

    function highlightRightWrong(name) {
        let resultClass;
        if (freezeCountries) {
            // setShowMark(freezeCountries);
            resultClass = addPairedName(name).includes(name)
                ? "right"
                : "wrong";
        }

        return resultClass;
    }

    let removeBackgroundColor;

    if (freezeCountries) {
        removeBackgroundColor = "transparent";
    }

    return (
        //consider removing logic from the mark up
        <>
            {countryInfo.map((country, index) => {
                return (
                    <div
                        key={country.name}
                        // className={`flag-div ${highlightRightWrong(
                        //     country.name
                        // )}`}
                        className="flag-div"
                        style={{
                            order: flagOrder[index],
                            backgroundColor: removeBackgroundColor,
                        }}
                    >
                        <img
                            className="mark"
                            src={
                                addPairedName(country.name).includes(
                                    country.name
                                )
                                    ? tick
                                    : cross
                            }
                            alt="result icon"
                            style={{
                                display: `${
                                    freezeCountries ? "block" : "none"
                                }`,
                            }}
                        />
                        <button
                            style={{
                                backgroundImage: `url(${country.flag})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "90%",
                                backgroundPosition: "center",
                            }}
                            disabled={freezeCountries}
                            className="flag-button"
                            onClick={() => {
                                stateResetter(
                                    countryInfo,
                                    gameState,
                                    dispatch,
                                    "choose-flag",
                                    "flag"
                                );

                                let status =
                                    gameState.flags[index].status ===
                                        "selected" ||
                                    gameState.flags[index].status === "paired"
                                        ? "unselected"
                                        : "selected";

                                dispatcher(
                                    dispatch,
                                    "choose-flag",
                                    status,
                                    index,
                                    country.name,
                                    "flag"
                                );

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
                        ></button>
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
