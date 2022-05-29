import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/actions/index"


const PlaylistCard = ({ data, hist }) => {
    const dispatch = useDispatch();
    const { setSelectedPlaylist } = bindActionCreators(actionCreators, dispatch)

    return (
        <>
            {data.tracks.total > 0 ?
                <div className="card" style={{ maxWidth: 540 + 'px' }}>
                    <Link to={{ pathname: `/${hist}/${data.id}` }} onClick={() => setSelectedPlaylist(data.id, data.tracks.total)}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={data.id === 'library' ?
                                        `${require('../../../assets/images/likedSongsCover2.jpg')}`
                                        : data.images[0].url} className="img-fluid rounded-start"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{data.name}</h5>
                                    <p className="card-text"><small className="text-muted">Tracks: {data.tracks.total}</small></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                :
                ''
            }
        </>
    )
}

export default PlaylistCard;