import axios from "axios"

export default {
  post: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ username: "mamush" })
        // reject({message:"Unauthorized"})
      }, 1000)
    })
  },
}

export const randomeUser = axios.create({
  baseURL: "https://randomuser.me/api/?results=30",
})
