import React,{ useState } from "react";

import styles from './ScrollButton.module.css'

const ScrollButton = () => {
    const [display, setDisplay] = useState(false)
    const goToTop = () => {
        document.documentElement.scrollTop = 0
    };


    window.addEventListener('scroll', (ev) => {
        document.documentElement.scrollTop > document.documentElement.clientHeight * 2 ? 
        setDisplay(true):setDisplay(false)
    })

    return (
    <>
        {display &&<i onClick={() => goToTop()} className={`icon__i ${styles.goTopIcon__i} fas fa-arrow-up`}></i> }
    </>

    )
}

export default ScrollButton;