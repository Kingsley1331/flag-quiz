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
        if (isNameSelected().check && isFlagSelected()) {
            console.log("flagIndex", isNameSelected());
            const countryNameDetails = isNameSelected();

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

    // function findCountryNameIndex() {
    //     gameState.countries;
    // }

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

//there needs to be an object that records the selected pairs probably name and index
//this object will then be referenced before any decisions is made about adding paired status(using the data attributes or known name for identification)
//it will also be used to determine when paired status should be removed
//recorded index in this object will then be used to determine what index the state change is applied to
//the object should look something like this [{name:'albania', flag:'albania'},{name:'ghana', flag:'ghana'}, ...]
//test ytesf 4rtrtr tytyr
