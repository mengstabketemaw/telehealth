import config from "./Config";
import axios from "axios"

class Auth {
  token;
  setToken;
  
  constructor(argToken, argSetToken) {
    this.token = argToken;
    this.setToken = argSetToken;
  }

  async user(url,credentials,successCallBack,errorCallBack) {
    return axios.post(config.AUTH_URL+url,credentials)
    .then(({data})=>{
      this.storeTokens(data);
      successCallBack(data);
      return data;
    })
    .catch(config.handleError(errorCallBack));
  }

  async refreshToken() {
   return axios.post(config.AUTH_URL+"/token/refresh",JSON.stringify({refreshToken:this.token.refreshToken}))
      .then(({data})=>{
      this.storeTokens(data);
      return data;
    })
  }

  async logoutUser() {
    return axios.post(config.AUTH_URL+"/token/refresh",JSON.stringify({refreshToken:this.token.refreshToken}))
      .then(({data})=>{
      this.clearTokens(this.token.refreshToken);
      return data;
    })
  }

  storeTokens(json) {
    this.setToken(json);
    config.storeAccessToken(json.accessToken);
  }

  clearTokens() {
    config.storeAccessToken("");
    this.setToken(null);
  }
}

export default Auth;
