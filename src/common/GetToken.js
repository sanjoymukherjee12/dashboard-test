
export const setToken = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("auth_token", token);
    } else {
      sessionStorage.setItem("auth_token", token);
    }
  };
  
  export const GetToken = () => {
    return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  };
  
  export const clearToken = () => {
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token");
  };
  