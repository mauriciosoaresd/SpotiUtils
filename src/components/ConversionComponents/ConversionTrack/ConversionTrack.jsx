import React from 'react'

const ConversionTrack = ({ song, selected }) => {
    return (
        <div className={`conversionTrack__div ${selected && 'purpleBackground'}`} >
            <div className="conversionTrack__imgWrapper">
                {/* <img src={song.album.images[2].url} alt="" width={64 + "px"} /> */}
                <img src={song.album.images[0].url} alt="" width={64 + "px"} />
            </div>

            <div>
                {(song.artist.map((artist) => artist.name)).join(', ')}
            </div>

            <div>
                {song.track}
            </div>

            <div className="d-none d-md-block">
                {song.album.name}
            </div>

        </div>
    )
}

export default ConversionTrack;