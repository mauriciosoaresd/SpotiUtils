import React, { useEffect, useState } from 'react'

import RefreshButton from '../../UI/RefreshButton/RefreshButton'
import TopListenedArtists from '../TopListenedArtists/TopListenedArtists'
import TopListenedTracks from '../TopListenedTracks/TopListenedTracks'

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"

import styles from './SpotifyStats.module.css'

const SpotifyStats = () => {
    const [timeRange, setTimeRange] = useState('short_term')
    const [topType, setTopType] = useState('artists')

    const spotifyStats = useSelector((state) => state.user.spotifyStats)
    const artists = useSelector((state) => state.user.spotifyStats.artists)
    const tracks = useSelector((state) => state.user.spotifyStats.tracks)

    const dispatch = useDispatch();
    const { getSpotifyStats, resetSpotifyStats, toggleLoading, resetSelectedPlaylist } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (Object.keys(spotifyStats.artists).length === 0 && Object.keys(spotifyStats.tracks).length === 0)
            getSpotifyStats()

        return () => {
            resetSelectedPlaylist()
            resetSpotifyStats()
        }
    }, [])

    let highlightButton = (ev) => {
        document.getElementsByClassName("timeRangeButtons__active")[0].classList.remove("timeRangeButtons__active")
        ev.target.classList.add("timeRangeButtons__active")
    }

    const refreshStats = () => {
        resetSpotifyStats()
        getSpotifyStats()
        toggleLoading(false)
    }

    return (
        <>
            <div className={`${styles.timeRangeButtons__divWrapper}`}>
                <button className={`${styles.timeRangeButton}`} onClick={() => setTopType('artists')}>Top Artists</button>
                |
                <button className={`${styles.timeRangeButton}`} onClick={() => setTopType('tracks')}>Top Tracks</button>
            </div>

            <div className={`${styles.timeRangeButtons__divWrapper}`}>
                <button className="timeRangeButtons__active" onClick={(ev) => { highlightButton(ev); setTimeRange('short_term') }}>4 weeks</button>
                <button onClick={(ev) => { highlightButton(ev); setTimeRange('medium_term') }}>6 months</button>
                <button onClick={(ev) => { highlightButton(ev); setTimeRange('long_term') }}>All-time</button>
            </div>

            <div className={`${styles.stats__divWrapper}`}>
                {
                    topType === 'artists' ?
                        <TopListenedArtists timeRange={timeRange} artists={artists} />
                        :
                        <TopListenedTracks timeRange={timeRange} tracks={tracks} />
                }

            </div>

            <RefreshButton refreshFunc={refreshStats} />
        </>

    )
}

export default SpotifyStats;