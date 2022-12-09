import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Navbar.module.css'

const Navbar = () => {
    const user = useSelector((state) => state.user);

    const handleLogin = () => {
        window.location = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/spotify`
    }

    useEffect(() => {
        let navbar = document.querySelector('.navbar')

        document.onscroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('purpleBackground')
            } else {
                navbar.classList.remove('purpleBackground')
            }
        }
        return () => { }

    }, [])

    return (
        <div className="navbar navbar-dark box-shadow navbar-expand-lg fixed-top">
            <div className="container d-flex justify-content-between">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <i className={`fab fa-spotify ${styles.spotifyIcon__i}`}></i>
                    <strong>SpotiUtils</strong>
                </Link>


                {
                    user.loggedIn ?
                        <Link to="/logout">Logout</Link>
                        :
                        <button className="navbar-login" type="submit" onClick={() => handleLogin()}>Login</button>
                }

            </div>
        </div>
    )
}

export default Navbar;