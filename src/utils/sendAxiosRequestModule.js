const axios = require('axios')

async function sendAxiosRequest(url, method = 'GET', payload = null) {
  const options = { method }
  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',

  }

  options.headers.Authorization = `Bearer ${payload}`
  return axios({ method, url, ...options })


}

export default sendAxiosRequest;