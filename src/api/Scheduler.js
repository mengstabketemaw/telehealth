import axios from "axios"

const schedule = axios.create({
  baseURL: "https://micheletsigab.pythonanywhere.com",
  config: {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  timeout: 15000,
})

export default schedule
