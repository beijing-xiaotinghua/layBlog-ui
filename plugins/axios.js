import axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = process.env.apiUrl
}

export default axios.create(options)
