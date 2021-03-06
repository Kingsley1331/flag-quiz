import React, { useState, useEffect } from "react";

const Names = (props) => {
    const {
        countryInfo,
        dispatch,
        highlightSelection,
        selectedCountry,
    } = props;

    // console.log("selectedCountries", selectedCountry);
    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <p
                        className="country"
                        onClick={(event) => {
                            dispatch({
                                type: "choose-country",
                                selectedCountry: country.name,
                                // country.name == selectedCountry
                                //     ? ""
                                //     : country.name,
                            });
                            // console.log(
                            //     "country-name " + country.name,
                            //     "selectedCountry " + selectedCountry
                            // );
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
