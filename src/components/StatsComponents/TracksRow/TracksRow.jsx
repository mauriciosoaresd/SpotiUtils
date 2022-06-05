import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"

import styles from './TracksRow.module.css'


const TracksRow = ({ track, id }) => {
    const [onHover, setOnHover] = useState(false)
    const [artists, setArtists] = useState(null)

    const dispatch = useDispatch();
    const { setSongToPlay } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        let artistsArray = track.artists.map((artist) => artist.name)
        setArtists(artistsArray.join(', '))
    }, [track])

    return (
        <tr onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            {onHover ?
                <td className="d-none d-sm-table-cell">
                    <Link to="/video-player">
                        <i
                            onClick={() => setSongToPlay({ artists, trackName: track.name })}
                            className={`fas fa-play-circle ${styles.playIcon_i}`}>

                        </i>
                    </Link>
                </td>
                :
                <td className="d-none d-sm-table-cell text-center">{id + 1}</td>
            }
            <td><img src={track.album.images[0].url} alt="Album cover" width={`61px`}/></td>
            <td>{artists}</td>
            <td>{track.name}</td>
            <td className="d-none d-md-table-cell">{track.album.name}</td>
        </tr>
    )
}

export default TracksRow;