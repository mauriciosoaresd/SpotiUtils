import React from 'react'

const RefreshButton = ({ refreshFunc }) => {
    return (
        <i onClick={() => refreshFunc()} className={`icon__i fas fa-sync-alt`}></i>
    )
}

export default RefreshButton;