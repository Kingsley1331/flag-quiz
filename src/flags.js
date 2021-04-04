import React, { useState, useEffect } from "react";

const Flags = (props) => {
    const {
        countryInfo,
        dispatch,
        highlightSelection,
        selectedFlag,
        gameState,
    } = props;

    // console.log("gameState", gameState.flags);

    const [flagIndex, setFlagIndex] = useState(null);

    useEffect(() => {
        // highlightSelection();
        // checkSelections();
        // console.log("isFlagSelected", isFlagSelected());
        // console.log("isNameSelected", isNameSelected());
        doWeHavePairing();
    }, [gameState]);

    function doWeHavePairing() {
        if (isNameSelected() && isFlagSelected()) {
            console.log("flagIndex", flagIndex);
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
        }
    }

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
            // debugger;
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
                //debugger;
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
                                // console.log(isFlagSelected());
                                // debugger;
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
                                // setSelected(true);
                                // highlightSelection();
                                // console.log(isFlagSelected());
                            }}
                            // key={country.name}
                            data-set={country.name}
                        >
                            <img className="flag" src={country.flag} />
                        </div>
                        <div className="chosenCountry">
                            {/* {country.name == selectedFlag
                                ? selectedCountry
                                : ""} */}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Flags;
