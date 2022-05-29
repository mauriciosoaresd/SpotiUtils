
import React from "react";

import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer>
            <div className={`${styles.footerButtons__divWrapper}`}>
                <a href="https://github.com/mauriciosoaresd" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>

                </a>

                <a href="https://www.linkedin.com/in/mauriciosdomingues/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </footer>
    )
}
export default Footer;