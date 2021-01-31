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
            {countryInfo.map((country) => {
                return (
                    <p
                        className="country"
                        onClick={(event) => {
                            dispatch({
                                type: "choose-country",
                                selectedCountry:
                                    country.name == selectedCountry
                                        ? ""
                                        : country.name,
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
