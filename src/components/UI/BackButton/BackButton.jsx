import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './BackButton.module.css'

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {location.pathname != "/" ?
                <i onClick={() => navigate(-1)} className={`${styles.backIcon__i} icon__i fixed-top fas fa-arrow-left`}></i>
                : ''
            }
        </>

    )
}

export default BackButton;