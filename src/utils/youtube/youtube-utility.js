import { searchVideo } from "./youtube-service"

export async function createTrackList(arr) {
    let list = arr.map(async song => {
        let artists = song.artist.map((artist, idx) => `${artist.name} `).join(' ')
        let trackName = song.track
        return `${artists} ${trackName}`
    })
    const resolveList = Promise.all(list)
    return await resolveList
}

export async function addTracksToPlaylist(trackList, setLinks) {
    let promises = trackList.map((trackStr, index) => {
        return () => {
            searchVideo(trackStr)
                .then(res => {
                    setLinks(prevState => {
                        let oldArr = [...prevState]
                        oldArr[index] = `https://www.youtube.com/watch?v=${res.data.id}`
                        return oldArr
                    })
                })
        }
    })
    return promises
}

export async function searchSong(data, setTrack) {
    let artists
    if (typeof data == 'string') {
        artists = data
    } else {
        artists = data.payload.track.artists.map((artist, idx) => `${artist.name} `).join(' ')
        artists += data.payload.track.name
    }

    searchVideo(`${artists}`)
        .then(results => setTrack([`https://www.youtube.com/watch?v=${results.data.id}`]))

}