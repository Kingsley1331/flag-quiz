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
    let { countryInfo, dispatch, gameState } = props;

    console.log("countryInfo", countryInfo);

    const [flagIndex, setFlagIndex] = useState(null);

    useEffect(() => {
        doWeHavePairing(gameState, flagIndex, dispatch);
    }, [gameState]);

    return (
        <>
            {countryInfo.map((country, index) => {
                // console.log("country", country);
                return (
                    <div key={country.name}>
                        <button
                            className="flag-div"
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
                            <img
                                className="flag"
                                alt="flag-pic"
                                src={country.flag}
                            />
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
