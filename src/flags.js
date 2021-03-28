import React, { useState, useEffect } from "react";

const Flags = (props) => {
    const {
        countryInfo,
        dispatch,
        highlightSelection,
        selectedFlag,
        gameState,
    } = props;

    console.log("gameState", gameState.flags);

    const [selected, setSelected] = useState(false);

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

    useEffect(() => {
        // highlightSelection();
        // checkSelections();
        console.log(isFlagSelected());
    }, [gameState]);

    function stateResetter() {
        countryInfo.map((country, index) => {
            if (gameState.flags[index].status === "selected") {
                dispatch({
                    type: "choose-flag",
                    flags: {
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
                                // console.log(isFlagSelected());
                                dispatch({
                                    type: "choose-flag",
                                    flags: {
                                        [index]: {
                                            country: country.name,
                                            status:
                                                gameState.flags[index]
                                                    .status === "selected"
                                                    ? "unselected"
                                                    : "selected",
                                        },
                                        index,
                                    },
                                });

                                setSelected(true);
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
