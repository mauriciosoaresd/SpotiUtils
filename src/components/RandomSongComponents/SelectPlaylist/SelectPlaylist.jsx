import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"

import InfiniteScroll from '../../UI/InfiniteScroll/InfiniteScroll'
import PlaylistCard from '../../UI/PlaylistCard/PlaylistCard'
import RefreshButton from '../../UI/RefreshButton/RefreshButton'
import SkeletonPlaylist from '../../UI/SkeletonPlaylist/SkeletonPlaylist'

import styles from './SelectPlaylist.module.css'

const SelectPlaylist = () => {
    const playlists = useSelector((state) => state.user.playlists);
    const loading = useSelector((state) => state.user.loading);
    const library = useSelector((state) => state.user.library)

    const dispatch = useDispatch();
    const { getAllPlaylists, getLibrary, toggleLoading } = bindActionCreators(actionCreators, dispatch)


    useEffect(async () => {
        if (playlists.items.length === 0) getLibrary().then(() => getAllPlaylists(playlists.items.length, 5))
    }, [])


    useEffect(() => {
        toggleLoading(false)
    }, [playlists, library])

    const refreshPlaylists = () => {
        getLibrary()
        getAllPlaylists(playlists.items.length, 5)
        toggleLoading(false)

    }


    return (
        <div className={`${styles.list}`}>
            <h1 className='pageTitle__h1'>Select a playlist to get a random track</h1>

            {library && <PlaylistCard idx={0} data={library} hist={`randomSong`} />}

            {
                playlists && playlists.items.map((playlist, idx) => {
                    return <PlaylistCard idx={idx} data={playlist} hist={`randomSong`} />
                })
            }


            {
                (playlists.items.length > 0) && !loading && (playlists.items.length < (playlists.total)) &&
                <InfiniteScroll fetchMore={() => getAllPlaylists(playlists.items.length, 1)} skeletonComponent={<SkeletonPlaylist />} />}

            {playlists.items.length < (playlists.total) && <>
                <SkeletonPlaylist />
            </>
            }
            {playlists.items.length === 0 && <>
                <SkeletonPlaylist />
                <SkeletonPlaylist />
                <SkeletonPlaylist />
                <SkeletonPlaylist />
            </>}

            <RefreshButton refreshFunc={refreshPlaylists} />

        </div>
    )
}

export default SelectPlaylist;