import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './CardsDiv.module.css'

const CardsDiv = () => {

    const user = useSelector((state) => state.user);
    return (
        <div className={`${styles.card__divWrapper} text-light`}>

            <div className="card" style={{ width: 23 + 'rem' }}>
                <Link to={user.loggedIn ? '/convert-playlists' : '/'}>
                    <img src={require('../../../assets/images/photo-1515010137531-66995c7f40e6.jpeg')} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title text-center">Spotify playlist to Youtube</h5>
                        <p className="card-text text-center">Convert your Spotify playlists and library to Youtube</p>
                    </div>
                </Link>
            </div>

            <div className="card" style={{ width: 23 + 'rem' }}>
                <Link to={user.loggedIn ? '/random-playlists' : '/'}>
                    <img src={require('../../../assets/images/concert.jpg')} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title text-center">Get a random song</h5>
                        <p className="card-text text-center">Select a playlist to get a random track</p>
                    </div>
                </Link>
            </div>

            <div className="card" style={{ width: 23 + 'rem' }}>
                <Link to={user.loggedIn ? '/my-stats' : '/'}>
                    <img src={require('../../../assets/images/photo-1526628953301-3e589a6a8b74.jpeg')} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title text-center">Check your Spotify Stats</h5>
                        <p className="card-text text-center">Get your most listened tracks and artists</p>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default CardsDiv;