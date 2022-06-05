import React from 'react'
import BackButton from '../../UI/BackButton/BackButton';

import SkeletonListenedTracks from "../SkeletonListenedTracks/SkeletonListenedTracks";
import TracksRow from '../TracksRow/TracksRow'

import styles from './TopListenedTracks.module.css'

const TopListenedTracks = ({ timeRange, tracks }) => {
    return (
        <><h1 className={`pageTitle__h1`}>Your most listened tracks</h1>
        <BackButton path="/" />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className={`d-none d-sm-table-cell text-center ${styles.statsTableRank__col}`}>#</th>
                        <th scope="col"></th>
                        <th scope="col">Artists</th>
                        <th scope="col">Track</th>
                        <th scope="col" className="d-none d-md-block">Album</th>
                    </tr>
                </thead>
                <tbody>

                    {tracks.hasOwnProperty(`${timeRange}`) && tracks[`${timeRange}`].items.map((track, idx) =>
                        <TracksRow track={track} id={idx} />
                    )}

                    {Object.keys(tracks).length === 0 ?
                        <>
                            <SkeletonListenedTracks />
                        </>
                        :
                        ''
                    }

                </tbody>
            </table>

        </>
    )
}

export default TopListenedTracks;