import React from 'react'

import styles from './LoginButton.module.css'

const LoginButton = () => {
    const handleLogin = () => {
        window.location = `${process.env.REACT_APP_DOMAIN}/auth/spotify`
    }
    return(
        <button className={`${styles.login__button}`} type="submit" onClick={() => handleLogin()}>
            Login with Spotify
        </button>
    )
}

export default LoginButton;