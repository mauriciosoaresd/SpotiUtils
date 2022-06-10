import React from 'react'

const CardSkeleton = () => {
    return (
        <div className="card" style={{ width: 23 + 'rem' }}>
            <img src={require('../../../assets/images/transparency640.png')} className="card-img-top skeletonImage__card" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title text-center skeletonText"></h5>
                <p className="card-text text-center skeletonText"></p>
            </div>
        </div>)
}

export default CardSkeleton;