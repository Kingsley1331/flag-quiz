
import React from "react";


const RingSvg = (props) => {

    const fraction = props.count / props.timeLimit * 100

    let ringColour

    if (fraction > 50) {
        ringColour = "#32cd32"
    } else if (fraction > 25) {
        ringColour = "orange"
    } else {
        ringColour = "#ff0000"
    }

    return (
        <>
            <svg viewBox="0 0 36 36" class="timer-svg" width="100" height="100">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    class="back-to-top__action__ring-bg"></path>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    stroke-dasharray={`${fraction}, 100`} class="back-to-top__action__ring" stroke={ringColour}></path>

            </svg>
        </>
    )
}

export default RingSvg