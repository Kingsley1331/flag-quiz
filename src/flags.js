import React, { useState, useEffect } from "react";

import {
    pairingsManager,
    addPairedName,
    unPairName,
    dispatcher,
    stateResetter,
    doWeHavePairing,
} from "./utility";

const Flags = (props) => {
    let { countryInfo, dispatch, gameState, order, freezeCountries } = props;

    // console.log(order);

    const [flagIndex, setFlagIndex] = useState(null);

    useEffect(() => {
        doWeHavePairing(gameState, flagIndex, dispatch);
    }, [gameState]);

    function highlightRightWrong(name) {
        let resultClass;
        if (freezeCountries) {
            resultClass = addPairedName(name).includes(name)
                ? "right"
                : "wrong";
        }

        return resultClass;
    }

    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <div
                        key={country.name}
                        className={`flag-div ${highlightRightWrong(
                            country.name
                        )}`}
                        style={{ order: order[index] }}
                    >
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
                        >
                            {/* <img
                                className="flag"
                                alt="flag-pic"
                                src={country.flag}
                            /> */}
                        </button>
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
