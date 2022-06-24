import React from 'react'

import loadingIcon from './assets/loading-spinner.svg'

export default function Loader() {
    return (
        <img className="loading-icon" src={loadingIcon}></img>
    )
}