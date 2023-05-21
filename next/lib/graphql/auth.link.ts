import { setContext } from "apollo-link-context";

export function SetAuthToken(token: string, temp = false) {
  if (temp) {
    sessionStorage.setItem("user-token", token);
  } else {
    localStorage.setItem("user-token", token);
  }
}
export function ClearAuthToken() {
  localStorage.removeItem("user-token");
  sessionStorage.removeItem("user-token");
}

export function GetAuthToken(temp = false) {
  return localStorage.getItem("user-token") || sessionStorage.getItem("user-token") || "";
}

export function GetIP() {
  return localStorage.getItem("user-ip") || "";
}

export function SetIP(ip: string) {
  return localStorage.setItem("user-ip", ip);
}

export const AuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return new Promise((resolve) => {
    const token = GetAuthToken();
    const ip = GetIP();
    const context = {
      headers: {
        ...headers,
        ...(token && token !== "undefined"
          ? {
              "x-token": token,
            }
          : {}),
        ...(ip && ip !== "undefined"
          ? {
              "x-forwarded-for": ip,
            }
          : {}),
      },
    };
    // return the headers to the context so httpLink can read them
    resolve(context);
  });
});
