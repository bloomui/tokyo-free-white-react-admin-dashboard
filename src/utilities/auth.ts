import cookie from "js-cookie";

const ACCESS_TOKEN_KEY = "HITHERE_ACCESS_TOKEN_TYPE";
const ROLE_KEY = "HITHERE_ROLE_TYPE";

export const setToken = (token: string) => {
  const expirationDays = 21;

  cookie.set(ACCESS_TOKEN_KEY, token, { expires: expirationDays });
};

export const getToken = (): String | null => {
  const cookieValue = cookie.get(ACCESS_TOKEN_KEY);

  if (cookieValue == null) {
    return null;
  } else {
    return cookieValue;
  }
};


export const clearAuth = () => {
  cookie.remove(ACCESS_TOKEN_KEY);
};

export const isLoggedIn = () => {
  return getToken() != null;
};