let pairings = [];

export function pairingsManager(gameState, index, countryName) {
    if (gameState.flags[index].status === "paired") {
        pairings = pairings.filter((pairs) => {
            return countryName !== pairs.flag;
        });

        console.log("pairings", pairings);
    }
}

export function addToPairings(pair) {
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
                dispatch({
                    type: "choose-country",
                    country: {
                        [nameIndex]: {
                            country: pairs.name.name,
                            status: "unselected",
                        },
                        index: nameIndex,
                    },
                });
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
