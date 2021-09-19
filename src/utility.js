export let pairings = [];

export function pairingsManager(gameState, index, countryName) {
    if (gameState.flags[index].status === "paired") {
        pairings = pairings.filter((pairs) => {
            return countryName !== pairs.flag;
        });

        console.log("pairings", pairings);
    }
}

function addToPairings(pair) {
    pairings.push(pair);
    console.log("pairings", pairings);
}

export function addPairedName(name) {
    const pairedName = pairings.map((pair) => {
        if (name === pair.flag) {
            return pair.name.name;
        }
        return "";
    });

    return pairedName;
}

export function unPairName(gameState, index, dispatch, name) {
    findNameIndex(name);
    if (gameState.flags[index].status === "paired") {
        pairings.forEach((pairs) => {
            if (pairs.flag === name) {
                let nameIndex = pairs.name.index;
                dispatcher(
                    dispatch,
                    "choose-name",
                    "unselected",
                    nameIndex,
                    pairs.name.name,
                    "name"
                );
            }
        });
    }
}

function findNameIndex(flagName) {
    pairings.map((pair) => {
        if (pair.flag === flagName) {
            return pair.name;
        }
    });
}

export function highlightSelection(
    containerRef,
    selections,
    type,
    elementClassName,
    selectionStyle
) {
    let countryArray = [
        ...containerRef.current.getElementsByClassName(elementClassName),
    ];
    countryArray.map((flag, index) => {
        if (selections[type][index].status === "selected") {
            flag.classList.add("selected");
        } else if (selections[type][index].status === "unselected") {
            flag.classList.remove("selected");
            flag.classList.remove(selectionStyle);
        } else {
            flag.classList.add(selectionStyle);
        }
    });
}

export function dispatcher(dispatch, type, status, index, name, dataType) {
    dispatch({
        type,
        [dataType]: {
            [index]: {
                country: name,
                status,
            },
            index,
        },
    });
}

export function stateResetter(
    countryInfo,
    gameState,
    dispatch,
    type,
    dataType
) {
    countryInfo.map((country, index) => {
        let stateType = dataType === "flag" ? "flags" : "names";
        if (gameState[stateType][index].status === "selected") {
            dispatcher(
                dispatch,
                type,
                "unselected",
                index,
                country.name,
                dataType
            );
        }
    });
}

export function doWeHavePairing(gameState, flagIndex, dispatch) {
    const countryNameDetails = isNameSelected(gameState);

    if (isNameSelected(gameState).check && isFlagSelected(gameState)) {
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
            "choose-name",
            "paired",
            countryNameDetails.index,
            countryNameDetails.name,
            "name"
        );
    }
}

function isFlagSelected(gameState) {
    let index;
    for (index in gameState.flags) {
        let status = gameState.flags[index].status;
        if (status === "selected") {
            return true;
        }
    }
    return false;
}

function isNameSelected(gameState) {
    let index;

    for (index in gameState.names) {
        let status = gameState.names[index].status;
        let name = gameState.names[index].country;
        if (status === "selected") {
            return { check: true, index, name };
        }
    }

    return { check: false };
}

function selectCountryFromApiData(arr) {
    const arrLength = arr.length;

    return arr[Math.floor(arrLength * Math.random())];
}

export function arrayOfSelectedCountries(apiData) {
    const selectedCountriesArray = [];
    let country;

    while (selectedCountriesArray.length < 5) {
        country = selectCountryFromApiData(apiData);

        if (!selectedCountriesArray.includes(country)) {
            selectedCountriesArray.push(country);
        }
    }

    return selectedCountriesArray;
}
