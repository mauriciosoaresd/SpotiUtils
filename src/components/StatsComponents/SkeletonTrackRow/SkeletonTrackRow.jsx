import React from 'react'

import styles from './SkeletonTrackRow.module.css'

const SkeletonTrackRow = () => {
    return (
        <tr>
            <td className={`d-none d-sm-table-cell ${styles.skeletonCell}`}>
                <div className={`${styles.skeletonCell} skeletonText ${styles.skeletonTableData}`}></div>
            </td>

            <td style={{ width: '81px' }}>
                <img className="skeletonImage__divWrapper" src={require('../../../assets/images/transparency64x64.png')} alt="" />
            </td>

            <td>
                <p className={`skeletonText ${styles.skeletonTableData}`}></p>
            </td>

            <td>
                <p className={`skeletonText ${styles.skeletonTableData}`}></p>
            </td>

            <td className="d-none d-md-table-cell">
                <p className={`skeletonText ${styles.skeletonTableData}`}></p>
            </td>
        </tr>
    )
}

export default SkeletonTrackRow;