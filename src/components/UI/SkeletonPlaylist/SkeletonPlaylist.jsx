import React from 'react'

import styles from './SkeletonPlaylist.module.css'

const SkeletonPlaylist = () => {
    return (
        <div className="card" style={{ maxWidth: 540 + 'px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <div style={{height: '100%'}}>

                    <div className="skeletonImage__divWrapper img-fluid rounded-start">
                    <img src={require('../../../assets/images/transparency640.png')}  class="img-fluid rounded-start" />
                        </div>
                    </div>
                </div>
                <div className={`col-md-8 ${styles.skeletonContainer}`}>
                    <div className={`card-body ${styles.skeletonContainer}`}>
                        <h5 className={`card-title skeletonText ${styles.skeletonText__title}`}></h5>
                        <p className={`card-text skeletonText ${styles.skeletonText__smallInfo}`}><small className="text-muted"></small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonPlaylist;