import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"


import ReactPlayer from 'react-player';
import VideoLoadingStatic from '../VideoLoadingStatic/VideoLoadingStatic'
import { addTracksToPlaylist, createTrackList, searchSong } from '../../../utils/youtube/youtube-utility'

import styles from './VideoPlayer.module.css'
//TERMINAR O PLAYER, EDITAR O RANDOM SONG P/ DIMINUIR A PARADA, COMPONENTIZAR ETC


const VideoPlayer = () => {
    const selectedPlaylist = useSelector((state) => state.user.selectedPlaylist);
    const selectedSong = useSelector((state) => state.user.selectedSong);
    const convertPlaylist = useSelector((state) => state.user.convertSongs);

    const [links, setLinks] = useState([])
    const [playingStatus, setPlayingStatus] = useState(false)

    const dispatch = useDispatch();
    const { resetSongToPlay,
        getRandomSong,
        resetRandomSong,
        resetSongsToConvert,
        resetPlaylistToConvert,
        resetAllPlaylists,
        resetSelectedPlaylist } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        if (selectedPlaylist != undefined) {
            getRandomSong(selectedPlaylist.id, selectedPlaylist.total)
                .then((data) => { searchSong(data, setLinks) })
        }
        if (selectedSong != undefined) {
            searchSong(`${selectedSong.artists} ${selectedSong.track}`, setLinks)
        }
        if (convertPlaylist != undefined) {
            createTrackList(convertPlaylist)
                .then(list => addTracksToPlaylist(list, setLinks))
                .then(promiseFns => Promise.all(promiseFns.map(fn => fn())))
        }
        return () => {
            resetSongToPlay()
            resetRandomSong()
            resetPlaylistToConvert()
            resetAllPlaylists()
            resetSongsToConvert()
            resetSelectedPlaylist()
        }
    }, [])

    return (
        <div className={`${styles.videoPlayer__divWrapper}`}>

            {
                links.length != 0 && !links.includes(undefined) && playingStatus ?
                    <ReactPlayer className={`${styles.videoPlayer}`}
                        url={links}
                        volume={1}
                        width="100%"
                        height='320px'
                        controls={true}
                        playing={true}
                    />
                    :
                    <VideoLoadingStatic
                        setPlaying={setPlayingStatus}
                        play={selectedPlaylist != undefined ?
                            !links.includes(undefined) && links != null && links.length > 0 :
                            selectedSong != undefined ?
                                !links.includes(undefined) && links != null && links.length > 0 :
                                convertPlaylist != undefined ?
                                    !links.includes(undefined) && links != null && links.length > 0 && links.length == convertPlaylist.length : false}
                    />
            }

        </div>
    )
}

export default VideoPlayer;