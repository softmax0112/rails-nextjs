import { apiBaseUrl } from "../config/environment";

export function setCookie(cname, cvalue, expireTime?) {
  if (expireTime) {
    var expires = "expires=" + expireTime.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  } else {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

const addMinutes = (dt: Date, minutes: number) => {
  return new Date(dt.getTime() + minutes * 60000);
};

const setLoginCookies = (token: string) => {
  setCookie("token", token, addMinutes(new Date(), 1440)); //1 day
};

export const loginWithEmail = async (email: string, password: string) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/JSON");

  let body = {
    email: email,
    password: password
  };

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body)
  };
  return fetch(`${apiBaseUrl.url}/users/login`, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then((result) => {
      setLoginCookies(result.token);
      return result;
    })
    .catch((error) => {
      return error.json();
    })
    .then((result) => {
      return result;
    });
};
