import React from "react";
import SkeletonPlaylist from "../../UI/SkeletonPlaylist/SkeletonPlaylist";

const TopListenedArtistsSkeleton = () => {
    return (
        <>
            <SkeletonPlaylist />
            <SkeletonPlaylist />
            <SkeletonPlaylist />
            <SkeletonPlaylist />
            <SkeletonPlaylist />
        </>
    )
}

export default TopListenedArtistsSkeleton;