class config{
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
      
      handleError(error) {
        this.clearTokens();
        const err = new Map([
          [TypeError, "Can't connect to server."],
          [SyntaxError, "There was a problem parsing the response."],
          [Error, error.message],
        ]).get(error.constructor);
        console.log(err);
        return err;
      }
}
    
    export default Config;