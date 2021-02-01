import React, { useState } from "react";

const Flags = (props) => {
    const {
        countryInfo,
        dispatch,
        highlightSelection,
        selectedCountry,
        selectedFlag,
    } = props;

    //const myRef = useRef(null);
     console.log("selectedFlag", selectedFlag);
      console.log("selectedCountry", selectedCountry===selectedFlag?"blue":"none");

    const [selected, setSelected] = useState(false);

    return (
        <>
            {countryInfo.map((country) => {
                return (
                    <div key={country.name}>
                        <div
                            // ref={myRef}
                            className="flag-div"
                            onClick={(event) => {
                                dispatch({
                                    type: "choose-flag",
                                    selectedFlag:
                                        country.name == selectedFlag
                                            ? ""
                                            : country.name,
                                });
                                setSelected(true);
                                highlightSelection();
                            }}
                            // key={country.name}
                            data-set={country.name}
                            // style={{backgroundColor:selectedCountry===selectedFlag?"blue":"none"}}
                        >
                            <img className="flag" src={country.flag} />
                        </div>
                        <div className="chosenCountry">
                            {country.name == selectedFlag
                                ? selectedCountry
                                : ""}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Flags;
