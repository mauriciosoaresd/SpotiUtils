import React from 'react'
import styles from './VideoLoadingStatic.module.css'

const VideoLoadingStatic = ({ setPlaying, play }) => {
    return (
        <section className={`${styles.staticEffect}`}>
            <div className={`${styles.staticEffect__wrapper}`}>
                {
                    play ?
                        <i className={`fas fa-play-circle fa-4x ${styles.staticEffect__i} ${styles.staticEffect__i__play}`} onClick={() => setPlaying(true)}></i> :
                        <i className={`fas fa-spinner fa-4x fa-pulse ${styles.staticEffect__i}`}></i>
                }
            </div>
        </section>)
}

export default VideoLoadingStatic;