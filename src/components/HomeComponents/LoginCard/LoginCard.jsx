import React from 'react'
import LoginButton from '../LoginButton/LoginButton'
import styles from './LoginCard.module.css'

const LoginCard = () => {
    return(
        <div className={`${styles.loginCard__divWrapper} text-center`} id="section">
            <h4>Convert your playlists and more...</h4>
            <h1 className="display-3">Start here.</h1>
            <LoginButton />
        </div>
    )
}

export default LoginCard;