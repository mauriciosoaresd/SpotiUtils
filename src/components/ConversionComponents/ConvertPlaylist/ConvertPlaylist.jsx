import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"

import InfiniteScroll from '../../UI/InfiniteScroll/InfiniteScroll'
import PlaylistCard from '../../UI/PlaylistCard/PlaylistCard'
import RefreshButton from '../../UI/RefreshButton/RefreshButton'
import SkeletonPlaylist from '../../UI/SkeletonPlaylist/SkeletonPlaylist'

const ConvertPlaylist = () => {
    const playlists = useSelector((state) => state.user.playlists);
    const loading = useSelector((state) => state.user.loading);

    const dispatch = useDispatch();
    const { getAllPlaylists, resetAllPlaylists, toggleLoading } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        if (playlists.items.length === 0) {
            getAllPlaylists(playlists.items.length, 5)
        }
        return () => { resetAllPlaylists() }
    }, [])

    useEffect(() => {
        toggleLoading(false)
    }, [playlists])


    const refreshPlaylists = () => {
        resetAllPlaylists()
            .then(() => getAllPlaylists(0, 5))
            .then(() => toggleLoading(false))
    }

    return (
        <>
            <h1 className='pageTitle__h1'>Select a playlist to convert</h1>

            {playlists && playlists.items.map((playlist, idx) => {
                return <PlaylistCard idx={idx} data={playlist} hist={`convert-playlist`} />
            })}

            {(playlists.items.length > 0) && !loading && (playlists.items.length < (playlists.total)) && <InfiniteScroll fetchMore={() => getAllPlaylists(playlists.items.length, 1)} skeletonComponent={<SkeletonPlaylist />} />}

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
        </>
    )
}

export default ConvertPlaylist;