import axios from "axios"
const responseBody = (res) => res.data

const instance = axios.create({
  baseURL: "http://matiows-001-site1.btempurl.com/",
  config: {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  timeout: 15000,
})

instance.interceptors.response.use(function (response) {
  return response
})

const requests = {
  get: (url) => instance.get(url).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
}

export default requests
