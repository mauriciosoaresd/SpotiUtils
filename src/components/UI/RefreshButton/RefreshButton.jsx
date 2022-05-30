import React from 'react'

import styles from './RefreshButton.module.css'

const RefreshButton = ({ refreshFunc }) => {
    return (
        <i onClick={() => refreshFunc()} className={`${styles.refreshIcon__i} bottomButtons icon__i fas fa-sync-alt`}></i>
    )
}

export default RefreshButton;