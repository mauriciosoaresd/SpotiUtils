import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"

import InfiniteScroll from '../../UI/InfiniteScroll/InfiniteScroll'
import ConversionTrack from '../ConversionTrack/ConversionTrack'
import SelectAllConvertButton from '../SelectAllConvertButton/SelectAllConvertButton'
import SkeletonConversionTrack from '../SkeletonConversionTrack/SkeletonConversionTrack'
import CreateYoutubePlaylistButton from '../CreateYoutubePlaylistButton/CreateYoutubePlaylistButton'

import styles from './ConvertSelection.module.css'

const ConvertSelection = () => {
    let { id } = useParams();

    const [list, setList] = useState([])
    const [selectedTotal, setselectedTotal] = useState(0)

    const playlist = useSelector((state) => state.user.conversionPlaylist);
    const loading = useSelector((state) => state.user.loading);

    const dispatch = useDispatch();
    const { getPlaylistToConvert,
        resetPlaylistToConvert,
        resetSelectedPlaylist,
        resetSongToPlay,
        setSongsToConvert,
        resetSongsToConvert,
        toggleLoading } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        resetSongsToConvert()
        resetSelectedPlaylist()
        getPlaylistToConvert(id)

        return () => {
            resetPlaylistToConvert()
            resetSongToPlay()
            resetSelectedPlaylist()
        }
    }, [])

    useEffect(() => {
        playlist.items.map((song, idx) => {
            (list.length == 0 || idx > list.length) &&
                setList(prevState => [
                    ...prevState,
                    { artist: song.track.artists, track: song.track.name, album: song.track.album, selected: false }
                ])
        })

        toggleLoading(false)
    }, [playlist])


    const toggleSelected = (index) => {
        setList(prevState => {
            prevState[index].selected === false ? setselectedTotal(selectedTotal + 1) : setselectedTotal(selectedTotal - 1)
            prevState[index].selected = !prevState[index].selected
            return [...prevState]
        })
    }

    const toggleAll = () => {
        let select = checkAllSelected()

        for (let index = 0; index < list.length; index++) {
            setList(prevState => {
                select === false ? setselectedTotal(list.length) : setselectedTotal(0)
                prevState[index].selected = !select
                return [...prevState]
            })
        }
    }

    const checkAllSelected = () => {
        let allSelected = true
        let selectedCount = 0

        list.map((song) => {
            if (song.selected === false) {
                selectedCount++
                allSelected = false
            } else {
                selectedCount--
            }
        })
        setselectedTotal(selectedCount)

        return allSelected
    }

    const sendSelected = () => {
        let songsArr = list.filter(song => {
            if (song.selected == true) return song
        })

        setSongsToConvert(songsArr)
    }


    return (
        <div className={`${styles.conversionContainer}`}>
            <h1 className='pageTitle__h1'>Select tracks to convert</h1>
            <div className={`conversionTable_divHeader ${styles.conversionTable_divHeader}`}>
                <div className="conversionTrack__imgWrapper">
                    <div width={64 + "px"}></div>
                </div>

                <div>Artist</div>

                <div>Track</div>

                <div className="d-none d-md-block">Album</div>

            </div>

            {
                list.length > 0 && list.map((song, idx) => {
                    return <div key={idx + 1} onClick={() => {
                        list.map((data, index) => data.track == song.track && data.artist == song.artist && toggleSelected(index))
                    }}>
                        <ConversionTrack song={song} selected={list[idx].selected} />
                    </div>
                })
            }

            {(playlist.items.length > 0) && !loading && (playlist.items.length - 1 < (playlist.total)) && <>
                <InfiniteScroll fetchMore={() => getPlaylistToConvert(id, playlist.items.length - 1, 10)} skeletonComponent={<SkeletonConversionTrack />} />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
            </>}

            {list.length == 0 && <>
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
                <SkeletonConversionTrack />
            </>}


            {list.length > 0 &&
                <div className={`${styles.conversionButtonsContainer_divWrapper}`}>
                    {selectedTotal > 0 && <CreateYoutubePlaylistButton sendSelected={sendSelected} />}
                    <SelectAllConvertButton toggleAll={toggleAll} totalSelected={selectedTotal} list={list.length} />
                </div>
            }
        </div>
    )
}

export default ConvertSelection;