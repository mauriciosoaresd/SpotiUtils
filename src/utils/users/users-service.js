import { Buffer } from 'buffer';
import sendAxiosRequest from '../sendAxiosRequestModule';

export function getToken() {
    const token = localStorage.getItem('token')
    if (!token) return null

    return (JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('binary')))
}


export async function signIn(token) {
    try {
        localStorage.setItem('token', token)
        let jwtUser = (JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('binary'))).user
        return jwtUser
    } catch (error) {
        throw new Error('Error signing in')
    }
}

export async function signOut() {
    const token = getToken()
    if (!token) return
    localStorage.removeItem('token')
    return

}

export async function checkToken(JWT) {
    if (JWT != null) return JWT.exp < Date.now() / 1000
    return false


}

export async function renewToken() {
    // mudar link
    let JWtoken = sendAxiosRequest('http://localhost:3001/refresh_token')
        .then(async (res) => {
            if (res.data.redirected) {
                signOut();
                window.location = 'http://localhost:3001/logout'
            } else {
                console.log(res.data)
                let JWT = await res.data.json()
                    .then(json => json.JWT)
                localStorage.setItem('token', JWT)
                return ((JSON.parse(Buffer.from(JWT.split('.')[1], 'base64').toString('binary'))).user.Stoken)
            }
        })
    return JWtoken
}

