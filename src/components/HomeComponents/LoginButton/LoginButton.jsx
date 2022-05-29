import React from 'react'

import styles from './LoginButton.module.css'

const LoginButton = () => {
    const handleLogin = () => {
        window.location = 'http://localhost:3001/auth/spotify'
    }
    return(
        <button className={`${styles.login__button}`} type="submit" onClick={() => handleLogin()}>
            Login with Spotify
        </button>
    )
}

export default LoginButton;