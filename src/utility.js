let pairings = [];

export function pairingsManager(gameState, index, countryName, type, dispatch) {
    if (gameState.flags[index].status === "paired") {
        pairings = pairings.filter((pairs) => {
            if (type === "flag") {
                // unPairName(pairs.name);
                return countryName !== pairs.flag;
            }
            //  else {
            //     return countryName !== pairs.name;
            // }
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
            return pair.name;
        }
        return "";
    });

    return pairedName;
}

// export function unPairName(name,dispatch){
//     dispatch({
//         type: "choose-country",
//         country: {
//             [countryNameDetails.index]: {
//                 country: name,
//                 status: "paired",
//             },
//             index: countryNameDetails.index,
//         },
//     });
// }

export function unPairName(gameState, index, dispatch, name) {
    debugger;
    findNameIndex(name);
    if (gameState.flags[index].status === "paired") {
        pairings.forEach((pairs) => {
            dispatch({
                type: "choose-country",
                country: {
                    [index]: {
                        country: pairs.name,
                        status: "unselected",
                    },
                    index: index,
                },
            });

            //  else {
            //     return countryName !== pairs.name;
            // }
        });

        // console.log("pairings", pairings);
    }
}

function findNameIndex(names, flagName) {
    pairings.map((pair) => {
        if (pair.flag === flagName) {
            return pair.name;
        }
    });
    // for(const index in names){
    // if (index.country === "paired") {

    // }
}

// }
