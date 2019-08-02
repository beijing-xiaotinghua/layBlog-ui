import axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = 'http://api.bw31d.com'
}

export default axios.create(options)
