import React, { useEffect } from "react";

import { dispatcher, stateResetter } from "../utility";
const Names = (props) => {
    const { countryInfo, dispatch, gameState, freezeCountries } = props;

    useEffect(() => {}, [gameState]);

    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <button
                        className="country"
                        disabled={freezeCountries}
                        onClick={() => {
                            stateResetter(
                                countryInfo,
                                gameState,
                                dispatch,
                                "choose-name",
                                "name"
                            );

                            let status =
                                gameState.names[index].status === "selected" ||
                                gameState.names[index].status === "paired"
                                    ? "unselected"
                                    : "selected";

                            dispatcher(
                                dispatch,
                                "choose-name",
                                status,
                                index,
                                country.name,
                                "name"
                            );
                        }}
                        key={country.name}
                        data-set={country.name}
                    >
                        {country.name}
                    </button>
                );
            })}
        </>
    );
};

export default Names;
