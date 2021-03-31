import { apiBaseUrl } from "../config/environment";
import { getCookie } from "./auth";

export interface apiCallProps {
  method: string;
  url: string;
  body?: any;
  headers?: any;
}

export const apiCall = async ({ method, url, body, headers }: apiCallProps) => {
  const url_ = `${apiBaseUrl.url}${url}`;
  let myHeaders = new Headers();
  let token = getCookie("token");
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(body)
  };
  return fetch(url_, requestOptions)
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else {
        throw res;
      }
    })
    .catch((error) => {
      if (error.status === 404) {
        return "404";
      } else if (error.status === 401) {
        return "401";
      }
      return "500";
    });
};
