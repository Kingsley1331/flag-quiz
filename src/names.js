import React, { useEffect } from "react";

const Names = (props) => {
    const { countryInfo, dispatch, gameState } = props;

    useEffect(() => {}, [gameState]);

    function stateResetter() {
        countryInfo.map((country, index) => {
            if (gameState.countries[index].status === "selected") {
                dispatch({
                    type: "choose-country",
                    country: {
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
                    <p
                        className="country"
                        onClick={(event) => {
                            stateResetter();
                            dispatch({
                                type: "choose-country",
                                country: {
                                    [index]: {
                                        country: country.name,
                                        status:
                                            gameState.countries[index]
                                                .status === "selected" ||
                                            gameState.countries[index]
                                                .status === "paired"
                                                ? "unselected"
                                                : "selected",
                                    },
                                    index,
                                },
                            });
                        }}
                        key={country.name}
                        data-set={country.name}
                    >
                        {country.name}
                    </p>
                );
            })}
        </>
    );
};

export default Names;
