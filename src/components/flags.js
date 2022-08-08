import React, { useState, useEffect } from "react";

import {
    pairingsManager,
    addPairedName,
    unPairName,
    dispatcher,
    stateResetter,
    doWeHavePairing,
} from "../utility";

import tick from "./../assets/tick.svg";
import cross from "./../assets/cross.svg";

const Flags = (props) => {
    let { countryInfo, dispatch, gameState, flagOrder, freezeCountries } =
        props;

    const [flagIndex, setFlagIndex] = useState(null);

    useEffect(() => {
        doWeHavePairing(gameState, flagIndex, dispatch);
    }, [gameState]);

    let removeBackgroundColor;

    if (freezeCountries) {
        removeBackgroundColor = "transparent";
    }

    function borderStyle(name) {
        if (freezeCountries) {
            return addPairedName(name).includes(name)
                ? "4px solid green"
                : "4px solid red";
        }
    }

    function stateManager(index, name) {
        stateResetter(countryInfo, gameState, dispatch, "choose-flag", "flag");

        let status =
            gameState.flags[index].status === "selected" ||
            gameState.flags[index].status === "paired"
                ? "unselected"
                : "selected";

        dispatcher(dispatch, "choose-flag", status, index, name, "flag");
        setFlagIndex({ index, name });
        unPairName(gameState, index, dispatch, name);
        pairingsManager(gameState, index, name, "flag");
    }

    return (
        //consider removing logic from the mark up
        <>
            {countryInfo.map((country, index) => {
                return (
                    <div
                        key={country.name}
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
                                display: freezeCountries ? "block" : "none",
                            }}
                        />
                        <button
                            style={{
                                backgroundImage: `url(${country.flag})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "90%",
                                backgroundPosition: "center",

                                border: borderStyle(country.name),
                            }}
                            disabled={freezeCountries}
                            className="flag-button"
                            onClick={() => {
                                stateManager(index, country.name);
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
