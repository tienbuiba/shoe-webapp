class TokenService {
    getLocalRefreshToken() {
        return localStorage.getItem("refreshToken");
    }
    getLocalAccessToken() {
        return localStorage.getItem("accessToken");
    }
    getLocalProfile() {
        return localStorage.getItem("profile");
    }
    getLocalLanguage() {
        return localStorage.getItem("language");
    }
    updateLocalLanguage(language) {
        return localStorage.setItem("language",language);
    }
    updateLocalAccessToken(accessToken) {
        localStorage.setItem("accessToken", accessToken);
    }
    updateLocalExpiresIn(expiresIn) {
        localStorage.setItem("expiresIn", expiresIn);
    }
    updateLocalProfile(profile) {
        localStorage.setItem("profile", profile);
    }
    removeAccessToken() {
        localStorage.removeItem("accessToken");
    }
    removeLocalExpiresIn() {
        localStorage.removeItem("expiresIn");
    }
    removeLocalProfile() {
        localStorage.removeItem("profile");
    }
    removeLocalLanguage() {
        localStorage.removeItem("language");
    }
  
}
export default new TokenService();