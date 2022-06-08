import React, { useState } from "react";

const ScrollButton = () => {
    const [display, setDisplay] = useState(false)
    const goToTop = () => {
        document.documentElement.scrollTop = 0
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };


    window.addEventListener('scroll', (ev) => {
        document.documentElement.scrollTop > document.documentElement.clientHeight * 2 ?
            setDisplay(true) : setDisplay(false)
    })

    return (
        <>
            { display && <i onClick={() => goToTop()} className={`icon__i fas fa-arrow-up`}></i> }
        </>

    )
}

export default ScrollButton;