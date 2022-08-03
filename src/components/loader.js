import React from "react";

import loadingIcon from "./../assets/spinner_on_white.gif";

export default function Loader() {
    return (
        <img
            className="loading-icon"
            src={loadingIcon}
            alt="loading icon"
        ></img>
    );
}
