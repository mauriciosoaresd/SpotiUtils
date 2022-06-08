export async function searchVideo(trackStr) {
    return fetch(`${process.env.REACT_APP_DOMAIN}/searchVideo`, {
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
