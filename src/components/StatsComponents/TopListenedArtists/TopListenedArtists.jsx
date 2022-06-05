import React from "react";
import BackButton from "../../UI/BackButton/BackButton";
import TopListenedArtistsSkeleton from "../TopListenedArtistsSkeleton/TopListenedArtistsSkeleton";

const TopListenedArtists = ({ timeRange, artists }) => {
    return (
        <>
            <h1 className={`pageTitle__h1`}>Your most listened artists</h1>
            <BackButton path="/" />
            {artists.hasOwnProperty(`${timeRange}`) && artists[`${timeRange}`].items.map((artist, idx) =>

                <div className="card" style={{ maxWidth: 540 + 'px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={artist.images[0].url} className="img-fluid rounded-start" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{idx + 1} - {artist.name}</h5>
                                <p className="card-text"><small className="text-muted">{artist.followers.total} followers</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {
                Object.keys(artists).length === 0 ?
                    <TopListenedArtistsSkeleton />
                    : ''
            }
        </>
    )
}

export default TopListenedArtists;