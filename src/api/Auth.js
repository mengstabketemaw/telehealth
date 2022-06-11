import config from "./Config"
import axios from "axios"

class Auth {
  token
  setToken

  constructor(argToken, argSetToken) {
    this.token = argToken
    this.setToken = argSetToken
  }

  async user(url, credentials, successCallBack, errorCallBack) {
    return axios
      .post(config.AUTH_URL + url, credentials)
      .then(({ data }) => {
        this.storeTokens(data)
        successCallBack(data)
      })
      .catch(config.handleError(errorCallBack))
  }

  async refreshToken() {
    return axios
      .post(config.AUTH_URL + "/token/refresh", {
        refreshToken: this.token.refreshToken,
      })
      .then(({ data }) => {
        this.storeTokens(data)
        return data
      })
  }

  async logoutUser() {
    this.clearTokens()
    axios.post(config.AUTH_URL + "/signout", {
      refreshToken: this.token.refreshToken,
    })
  }

  storeTokens(json) {
    this.setToken(json)
    config.storeAccessToken(json.accessToken)
  }

  clearTokens() {
    config.storeAccessToken("")
    this.setToken(null)
  }
}

export default Auth
