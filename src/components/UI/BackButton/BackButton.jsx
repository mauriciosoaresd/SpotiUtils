import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './BackButton.module.css'

const BackButton = ({ path }) => {
    const navigate = useNavigate();
    // const location = useLocation();

    return (
        <>

            <div className={styles.backIcon__divWrapper}>
                <i onClick={() => navigate(path?path:-1)} className={`${styles.backIcon__i} icon__i fas fa-arrow-left`}></i>
            </div>
        </>

    )
}

export default BackButton;