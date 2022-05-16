class Config{
    SCHEME = process.env.SCHEME ? process.env.SCHEME : "http";
    HOST = process.env.HOST ? process.env.HOST : "localhost";
    PORT = process.env.PORT ? process.env.PORT : "8080";

    USER_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/user`
    AUTH_URL = `${this.SCHEME}://${this.HOST}:${this.PORT}/api/oauth`
    
    ACCESS_TOKEN = "accessToken";
    EXPIRATION = "expiration";

    defaultHeaders() {
        return {
          "Content-Type": "application/json",
        };
      }
    
      headersWithAuthorization() {
        return {
          ...this.defaultHeaders(),
          Authorization: localStorage.getItem(this.ACCESS_TOKEN),
        };
      }

      tokenExpired() {
        const expDate = Number(localStorage.getItem(this.EXPIRATION));
        if (expDate > Date.now()) {
          return false;
        }
        return true;
      }
    
      storeAccessToken(token) {
        localStorage.setItem(this.ACCESS_TOKEN, `Bearer ${token}`);
        localStorage.setItem(this.EXPIRATION, this.getExpiration(token));
      }
    
      getExpiration(token) {
        let encodedPayload = token ? token.split(".")[1] : null;
        if (encodedPayload) {
          encodedPayload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
          const payload = JSON.parse(window.atob(encodedPayload));
          return payload?.exp ? payload?.exp * 1000 : 0;
        }
        return 0;
      }
      
      handleError(errorCallBack){
        return (error) => {
          let message = "Could't connect to the server";
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(error.response.status){
              message = error.response.data?.message||"The server replayed with error code";
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            message = error.request||"Oops... There is no response from the server";
            
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            message = error.message || "Could't connect to the server";
          }
          errorCallBack(message);
        };
      }
}
export default new Config();