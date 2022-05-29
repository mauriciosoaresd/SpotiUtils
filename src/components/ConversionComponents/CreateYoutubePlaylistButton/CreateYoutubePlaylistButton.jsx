import React from 'react'
import { Link } from 'react-router-dom'

const CreateYoutubePlaylistButton = ({ sendSelected }) => {
    return (
        <Link to="/converted-playlist-display" onClick={() => sendSelected()}>
            <button className='conversionButton'>Create Playlist</button>
        </Link>
    )
}

export default CreateYoutubePlaylistButton;