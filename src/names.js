import React, { useEffect } from "react";

import { dispatcher, stateResetter } from "./utility";
const Names = (props) => {
    const { countryInfo, dispatch, gameState } = props;

    useEffect(() => {}, [gameState]);

    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <button
                        className="country"
                        onClick={() => {
                            stateResetter(
                                countryInfo,
                                gameState,
                                dispatch,
                                "choose-name",
                                "country"
                            );

                            let status =
                                gameState.countries[index].status ===
                                    "selected" ||
                                gameState.countries[index].status === "paired"
                                    ? "unselected"
                                    : "selected";

                            dispatcher(
                                dispatch,
                                "choose-name",
                                status,
                                index,
                                country.name,
                                "country"
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
