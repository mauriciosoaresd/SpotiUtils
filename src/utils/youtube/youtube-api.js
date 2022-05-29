const BASE_URL = 'https://youtube.googleapis.com/youtube'


export async function searchVideo(trackStr) {
    return fetch("http://localhost:3001/searchVideo", {
        method: 'POST',
        body: JSON.stringify({
            track: trackStr,
        }),
        headers: {
            "Accept": "application/json;",
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}
