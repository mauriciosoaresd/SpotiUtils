import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from '../../redux/actions'

import SkeletonPlaylist from '../../components/UI/SkeletonPlaylist/SkeletonPlaylist'
import styles from './PlaylistsPage.module.css'
import InfiniteScroll from '../../components/UI/InfiniteScroll/InfiniteScroll'
import RefreshButton from '../../components/UI/RefreshButton/RefreshButton'
import PlaylistCard from '../../components/UI/PlaylistCard/PlaylistCard'

const PlaylistsPage = ({ page }) => {
    const playlists = useSelector((state) => state.user.playlists)
    const loading = useSelector((state) => state.user.loading)
    const library = useSelector((state) => state.user.library)

    const dispatch = useDispatch()
    const { getAllPlaylists, resetAllPlaylists, getLibrary, toggleLoading } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (playlists.items.length === 0)
            if (page == "random") {
                getLibrary().then(() => getAllPlaylists(playlists.items.length, 5))

            } else {
                getAllPlaylists(playlists.items.length, 5)
            }

        return () => { resetAllPlaylists() }
    }, [])

    useEffect(() => {
        toggleLoading(false)
    }, [playlists, library])

    const refreshPlaylists = () => {
        if (page == "random") {
            resetAllPlaylists()
                .then(() => getLibrary())
                .then(() => getAllPlaylists(playlists.items.length, 50))
                .then(() => toggleLoading(false))
        } else {
            resetAllPlaylists()
                .then(() => getAllPlaylists(0, 50))
                .then(() => toggleLoading(false))
        }
    }

    return (
        <div className={`${styles.playlistsPage__divWrapper}`}>
            {
                page == "random" ?
                    <>
                        <h1 className='pageTitle__h1'>Select a playlist to convert</h1>

                        {library && <PlaylistCard idx={0} data={library} hist={`random-song`} />}
                        {playlists && playlists.items.map((playlist, idx) => {
                            return <PlaylistCard idx={idx} data={playlist} hist={`random-song`} />
                        })}
                    </> :
                    <>
                        <h1 className='pageTitle__h1'>Select a playlist to get a random track</h1>
                        {playlists && playlists.items.map((playlist, idx) => {
                            return <PlaylistCard idx={idx} data={playlist} hist={`convert-playlist`} />
                        })}
                    </>

            }


            {
                (playlists.items.length > 0) && !loading && (playlists.items.length < (playlists.total)) &&
                <InfiniteScroll fetchMore={() => getAllPlaylists(playlists.items.length, 50)} skeletonComponent={<SkeletonPlaylist />} />
            }

            {playlists.items.length < (playlists.total) &&
                <>
                    <SkeletonPlaylist />
                </>
            }

            {playlists.items.length === 0 &&
                <>
                    <SkeletonPlaylist />
                    <SkeletonPlaylist />
                    <SkeletonPlaylist />
                    <SkeletonPlaylist />
                </>
            }

            <RefreshButton refreshFunc={refreshPlaylists} />

        </div>
    )
}

export default PlaylistsPage