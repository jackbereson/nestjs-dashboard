import { SetIP } from "../graphql/auth.link";

export function GetMyIP(callback) {
  fetch("https://api.ipify.org?format=json", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      callback(null, result.ip);
      SetIP(result.ip);
    })
    .catch((error) => callback(error, null));
}
