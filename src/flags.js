import React, { useState } from "react";

const Flags = (props) => {
    const { countryInfo, dispatch, highlightSelection, selectedFlag } = props;

    const [selected, setSelected] = useState(false);

    return (
        <>
            {countryInfo.map((country, index) => {
                return (
                    <div key={country.name}>
                        <div
                            // ref={myRef}
                            className="flag-div"
                            onClick={() => {
                                dispatch({
                                    type: "choose-flag",
                                    flags: {
                                        [index]: {
                                            country: country.name,
                                            status:
                                                selectedFlag[index].status ===
                                                "selected"
                                                    ? "unselected"
                                                    : "selected",
                                        },
                                        index,
                                    },
                                });

                                setSelected(true);
                                highlightSelection();
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
