import React, { useState, useEffect } from "react";

const Names = (props) => {
    const {
        countryInfo,
        dispatch,
        highlightSelection,
        selectedCountry,
    } = props;

    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <p
                        className="country"
                        onClick={(event) => {
                            dispatch({
                                type: "choose-country",
                                countries: {
                                    [index]: {
                                        country: country.name,
                                        status:
                                            selectedCountry[index].status ===
                                            "selected"
                                                ? "unselected"
                                                : "selected",
                                    },
                                    index,
                                },
                            });

                            highlightSelection(event);
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
