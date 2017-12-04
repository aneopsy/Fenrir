class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static setToken(token) {
    localStorage.setItem('session_token', token);
  }

  static removeToken() {
    localStorage.removeItem('session_token');
  }

  static getToken() {
    return localStorage.getItem('session_token');
  }

  static authenticateUser(user) {
    localStorage.setItem('session_user', JSON.stringify(user));
  }

  /**
   * Check if a user is authenticated - check if a user is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('session_user') !== null;
  }

  static removeAuthenticateUser() {
    localStorage.removeItem('session_user');
  }

  static getUser() {
    const user = localStorage.getItem('session_user');
    return user ? JSON.parse(user) : null;
  }
}

export default Auth;
